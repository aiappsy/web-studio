import { env } from "@/lib/env";

export async function aiRequest({
  prompt,
  model = env.AI_DEFAULT_MODEL,
  userKey,
  stream = false,
}) {
  const apiKey = userKey?.length
    ? userKey
    : env.OPENROUTER_API_KEY;

  const res = await fetch(`${env.OPENROUTER_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      stream,
      messages: [
        { role: "system", content: "You are a professional web assistant." },
        { role: "user", content: prompt },
      ],
    }),
  });

  if (!res.ok) {
    throw new Error(`AI request failed: ${res.status}`);
  }

  if (stream) return res;

  const json = await res.json();
  return json.choices?.[0]?.message?.content || "";
}
