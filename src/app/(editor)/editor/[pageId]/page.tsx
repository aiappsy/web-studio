import Renderer from "@/components/builder/Renderer";
import AiConsole from "./components/AiConsole";
import { prisma } from "@/lib/prisma";
import { applyPatch } from "@/server/ai/patch";

export default async function EditorPage({ params }: { params: { pageId: string } }) {
  const page = await prisma.page.findUnique({
    where: { id: params.pageId },
  });

  if (!page) return <div>Page not found.</div>;

  const pageJson = page.data as any;

  async function applyInstruction(instruction: string) {
    "use server";

    const updated = await applyPatch(pageJson, instruction);

    await prisma.page.update({
      where: { id: params.pageId },
      data: {
        data: updated,
      },
    });
  }

  return (
    <div className="flex h-screen">
      {/* Left side: Preview */}
      <div className="flex-1 overflow-auto border-r">
        <Renderer page={pageJson} />
      </div>

      {/* Right side: AI Console */}
      <div className="w-96 flex flex-col">
        <AiConsole onInstruction={applyInstruction} />
      </div>
    </div>
  );
}
