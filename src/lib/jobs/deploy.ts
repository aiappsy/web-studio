import { prisma } from "@/lib/prisma";
import { env } from "@/lib/env";

export async function deployJobHandler({ jobId }: { jobId: string }) {
  await prisma.deployJob.update({
    where: { id: jobId },
    data: { status: "processing" },
  });

  // TODO: Implement Coolify API call
  console.log("Deploying site for job", jobId);

  await prisma.deployJob.update({
    where: { id: jobId },
    data: { status: "completed" },
  });
}
