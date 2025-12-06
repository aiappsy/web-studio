
import Renderer from "@/components/builder/Renderer";
import AiConsole from "./components/AiConsole";
import { prisma } from "@/lib/prisma";
import { applyPatch } from "@/server/ai/patch";

export default async function EditorPage({ params }: any) {
  const page = await prisma.page.findUnique({
    where: { id: params.pageId },
  });

  if (!page) return <div>Page not found.</div>;
  const pageJson = page.data as any;

  async function onAiInstruction(instruction: string) {
    "use server";
    const updated = await applyPatch(pageJson, instruction);
    await prisma.page.update({
      where: { id: params.pageId },
      data: { data: updated },
    });
  }

  return (
    <div className="flex h-screen">
      <div className="flex-1 overflow-auto border-r">
        <Renderer page={pageJson} />
      </div>
      <div className="w-96 border-l">
        <AiConsole onInstruction={onAiInstruction} />
      </div>
    </div>
  );
}
