export interface Env {
    DB: D1Database;
    GEMINI_API_KEY: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    try {
        const { results } = await context.env.DB.prepare("SELECT * FROM ingredients ORDER BY updated_at DESC").all();
        return new Response(JSON.stringify({ success: true, data: results }), {
            headers: { "Content-Type": "application/json" }
        });
    } catch (err: any) {
        return new Response(JSON.stringify({ success: false, error: err.message }), { status: 400 });
    }
};

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

        // 如果提供了 input 字符串，使用 Fetch 调用 Gemini 解析
        if (input && context.env.GEMINI_API_KEY) {
            const prompt = `解析以下食谱材料描述，提取名称(name)、数量(quantity)、单位(unit)、分类(category)和备注(notes)。
            输入: "${input}"
            不要任何markdown，纯JSON对象返回。示例: {"name":"鸡蛋", "quantity":"2", "unit":"个", "category":"蛋奶", "notes":""}`;

            const aiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${context.env.GEMINI_API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }]
                })
            });

            if (aiRes.ok) {
                const aiData = await aiRes.json();
                const text = aiData.candidates[0].content.parts[0].text.replace(/```json|```/g, "").trim();
                const aiParsed = JSON.parse(text);
                finalData = { ...finalData, ...aiParsed };
            }
        }

        if (!finalData.name) throw new Error("Missing material name");

        // 执行 Upsert 操作
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
            finalData.name, finalData.quantity, finalData.unit, finalData.category, finalData.notes
        ).first();

        return new Response(JSON.stringify({ success: true, data: result }), {
            headers: { "Content-Type": "application/json" }
        });
    } catch (err: any) {
        return new Response(JSON.stringify({ success: false, error: err.message }), { status: 400 });
    }
};
