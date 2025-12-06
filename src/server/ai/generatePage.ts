export async function generatePage(siteJson: any, pageName: string) {
  const prompt = `
Generate a new page "${pageName}" using this site structure:
${JSON.stringify(siteJson, null, 2)}
`;

  const response = await openrouter.chat.completions.create({
    model: process.env.DEFAULT_AI_MODEL!,
    messages: [{ role: "user", content: prompt }],
  });

  return JSON.parse(response.choices[0].message.content);
}
