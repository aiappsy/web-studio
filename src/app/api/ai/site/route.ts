
import { generateSite } from "@/server/ai/generateSite";
export async function POST(req: Request) {
  const body = await req.json();
  const json = await generateSite(body.input);
  return Response.json(json);
}
