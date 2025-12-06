
import { applyPatch } from "@/server/ai/patch";
export async function POST(req: Request) {
  const body = await req.json();
  const json = await applyPatch(body.site, body.instruction);
  return Response.json(json);
}
