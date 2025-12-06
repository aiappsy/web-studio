import { prisma } from "@/lib/prisma";
import EditorLayout from "./components/EditorLayout";
import { useBuilder } from "@/store/builder-store";

async function getPage(pageId: string) {
  return prisma.page.findUnique({
    where: { id: pageId },
  });
}

export default async function EditorPage({ params }: any) {
  const page = await getPage(params.pageId);

  if (!page) return <div>Page not found.</div>;

  // Preload blocks as JSON
  const blocks = page.blocks ?? [];

  return (
    <EditorLayout
      pageId={page.id}
      blocks={blocks}
      pageName={page.name}
    />
  );
}
