
import { generatePage } from "@/server/ai/generatePage";
export async function POST(req: Request) {
  const body = await req.json();
  const json = await generatePage(body.site, body.pageName);
  return Response.json(json);
}
