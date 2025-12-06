export async function applyPatch(siteJson: any, instruction: string) {
  const prompt = `
Modify ONLY the necessary section of this JSON, do not regenerate the whole document.

Current JSON:
${JSON.stringify(siteJson, null, 2)}

User Instruction:
"${instruction}"

Return ONLY the modified JSON node.
`;

  const response = await openrouter.chat.completions.create({
    model: process.env.DEFAULT_AI_MODEL!,
    messages: [{ role: "user", content: prompt }],
  });

  return JSON.parse(response.choices[0].message.content);
}
