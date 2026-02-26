export interface Env {
    DB: D1Database;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    try {
        const data = await context.request.json() as any;

        // 执行真正的 D1 INSERT 语句
        const { name, quantity, unit, category, notes } = data;

        if (!name) {
            throw new Error("材料名称(name)为必填项");
        }

        const result = await context.env.DB.prepare(
            "INSERT INTO ingredients (name, quantity, unit, category, notes) VALUES (?, ?, ?, ?, ?) RETURNING *"
        ).bind(
            name,
            quantity || "",
            unit || "",
            category || "",
            notes || ""
        ).first();

        return new Response(JSON.stringify({
            success: true,
            message: "保存成功",
            data: result
        }), {
            headers: { "Content-Type": "application/json" }
        });
    } catch (err: any) {
        return new Response(JSON.stringify({
            success: false,
            error: err.message || "Unknown error"
        }), {
            status: 400,
            headers: { "Content-Type": "application/json" }
        });
    }
};
