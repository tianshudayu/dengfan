export interface Env {
    GEMINI_API_KEY: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    try {
        const body = await context.request.json() as { query: string };
        const { query } = body;

        if (!query) throw new Error("Query is required");
        if (!context.env.GEMINI_API_KEY) throw new Error("GEMINI_API_KEY not configured");

        const prompt = `You are a cyberpunk kitchen assistant (Antigravity OS). Answer the user's cooking query concisely.
        Query: ${query}`;

        const aiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${context.env.GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        if (!aiRes.ok) throw new Error("AI provider error");

        const aiData = await aiRes.json();
        const text = aiData.candidates[0].content.parts[0].text.trim();

        return new Response(JSON.stringify({ success: true, text }), {
            headers: { "Content-Type": "application/json" }
        });
    } catch (err: any) {
        return new Response(JSON.stringify({ success: false, error: err.message }), { status: 400 });
    }
};
