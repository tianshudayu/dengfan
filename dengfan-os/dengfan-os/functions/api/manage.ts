import { GoogleGenerativeAI } from "@google/genai";

export interface Env {
    DB: D1Database;
    GEMINI_API_KEY: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    try {
        const body = await context.request.json() as any;
        const { input, name: rawName, quantity: rawQuantity, unit: rawUnit, category: rawCategory, notes: rawNotes } = body;

        let finalData = {
            name: rawName,
            quantity: rawQuantity || "",
            unit: rawUnit || "",
            category: rawCategory || "",
            notes: rawNotes || ""
        };

        // 如果提供了 input 字符串，启用 Gemini 解析
        if (input && context.env.GEMINI_API_KEY) {
            const genAI = new GoogleGenerativeAI(context.env.GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const prompt = `解析以下食谱材料描述，提取名称(name)、数量(quantity)、单位(unit)、分类(category)和备注(notes)。
            输入: "${input}"
            以 JSON 格式返回，不要包含任何 markdown 标记或其他文字。示例: {"name":"鸡蛋", "quantity":"2", "unit":"个", "category":"蛋奶", "notes":""}`;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text().replace(/```json|```/g, "").trim();
            const aiParsed = JSON.parse(text);
            finalData = { ...finalData, ...aiParsed };
        }

        if (!finalData.name) {
            throw new Error("Missing material name");
        }

        // 执行 Upsert 操作：如果 name 冲突则更新其他字段
        const result = await context.env.DB.prepare(`
            INSERT INTO ingredients (name, quantity, unit, category, notes, updated_at) 
            VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
            ON CONFLICT(name) DO UPDATE SET
                quantity = excluded.quantity,
                unit = excluded.unit,
                category = excluded.category,
                notes = excluded.notes,
                updated_at = CURRENT_TIMESTAMP
            RETURNING *
        `).bind(
            finalData.name,
            finalData.quantity,
            finalData.unit,
            finalData.category,
            finalData.notes
        ).first();

        return new Response(JSON.stringify({
            success: true,
            data: result
        }), {
            headers: { "Content-Type": "application/json" }
        });
    } catch (err: any) {
        return new Response(JSON.stringify({ success: false, error: err.message }), {
            status: 400,
            headers: { "Content-Type": "application/json" }
        });
    }
};
