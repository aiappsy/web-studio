import { openrouter } from "@/lib/openrouter";
import { SiteDefinition } from "@/lib/builder/schema/types";

export async function generateSite(input: string): Promise<SiteDefinition> {
  const prompt = `
You are an expert AI web architect. Generate a JSON site definition.

USER INPUT:
${input}

FORMAT:
{ "site": {..}, "pages": [..] }
`;

  const response = await openrouter.chat.completions.create({
    model: process.env.DEFAULT_AI_MODEL!,
    messages: [{ role: "user", content: prompt }],
  });

  return JSON.parse(response.choices[0].message.content);
}
