
import Renderer from "@/components/builder/Renderer";
import { prisma } from "@/lib/prisma";

export default async function PreviewPage({ params }: any) {
  const site = await prisma.site.findUnique({
    where: { id: params.siteId },
    include: { pages: true },
  });

  if (!site) return <div>Site not found.</div>;
  const home = site.pages.find((p) => p.path === "/");
  if (!home) return <div>No homepage found.</div>;

  return <Renderer page={home.data} />;
}
