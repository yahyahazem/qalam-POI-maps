export async function parseArabicQuery(query: string) {
    const HF_TOKEN = process.env.HF_TOKEN;

    if (!HF_TOKEN) {
        throw new Error("HF_TOKEN is not defined");
    }

    const systemPrompt = `Analyze the Arabic map query and return ONLY a JSON object with: location, category, sub_type, features, sort_by. 
  Example: "مطعم بيتزا جيد في دبي مع مواقف" -> {"location": "دبي", "category": "restaurant", "sub_type": "pizza", "features": ["parking"], "sort_by": "rating"}`;

    try {
        const response = await fetch(
            "https://router.huggingface.co/v1/chat/completions",
            {
                headers: {
                    Authorization: `Bearer ${HF_TOKEN}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    model: "Qwen/Qwen2.5-7B-Instruct",
                    messages: [
                        { role: "system", content: systemPrompt },
                        { role: "user", content: query }
                    ],
                    max_tokens: 500,
                }),
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Hugging Face API Error:", errorText);
            throw new Error(`AI Model Error (${response.status}): ${errorText || response.statusText}`);
        }

        const result = await response.json();
        const text = result.choices?.[0]?.message?.content || "";
        console.log("AI Raw Output:", text);

        // Extract JSON from the generated text (it might be wrapped in backticks)
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            try {
                return JSON.parse(jsonMatch[0]);
            } catch (e) {
                console.error("JSON Parse Error:", e);
                throw new Error("Failed to parse AI response as JSON");
            }
        }

        throw new Error("AI did not return a valid JSON object. Check your input or keys.");
    } catch (error) {
        console.error("Error in parseArabicQuery:", error);
        throw error;
    }
}
