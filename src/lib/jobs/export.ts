import { prisma } from "@/lib/prisma";
import JSZip from "jszip";

export async function exportJobHandler({ jobId }: { jobId: string }) {
  await prisma.exportJob.update({
    where: { id: jobId },
    data: { status: "processing" },
  });

  const job = await prisma.exportJob.findUnique({
    where: { id: jobId },
    include: {
      site: {
        include: { pages: true },
      },
    },
  });

  if (!job) return;

  const zip = new JSZip();

  job.site.pages.forEach((page) => {
    zip.file(`${page.path}.html`, generateHTML(page.blocks));
  });

  const buffer = await zip.generateAsync({ type: "nodebuffer" });

  // TODO: Upload to storage (S3, Supabase, etc.)
  const url = `https://your-storage/${jobId}.zip`;

  await prisma.exportJob.update({
    where: { id: jobId },
    data: {
      status: "completed",
      resultUrl: url,
    },
  });

  console.log("Export completed for", jobId);
}

function generateHTML(blocks: any) {
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>WebStudio Export</title>
  </head>
  <body>
    ${JSON.stringify(blocks)}
  </body>
</html>`;
}
