import { gemini }
    from "../config/gemini.js";

export async function explainIssue(
    title: string,
    description: string
) {
    const response =
        await gemini.models.generateContent({
            model:
                "gemini-2.5-flash",

            contents: `
You are a senior API security engineer.

Explain this API security issue
simply and professionally.

Issue:
${title}

Description:
${description}

Return exactly:

EXPLANATION:
<explanation>

FIX:
<fix>
`,
        });

    const text =
        response.text ?? "";

    const explanation =
        text
            .split("FIX:")[0]
            ?.replace("EXPLANATION:", "")
            .trim() ?? "";

    const fix =
        text
            .split("FIX:")[1]
            ?.trim() ??
        "";

    return {
        explanation,
        fix,
    };
}