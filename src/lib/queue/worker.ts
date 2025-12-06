import { queue } from "./index";
import { exportJobHandler } from "../jobs/export";
import { deployJobHandler } from "../jobs/deploy";
import { prisma } from "@/lib/prisma";

async function poll() {
  console.log("Worker started. Waiting for jobs...");

  while (true) {
    let job = await queue.getNext();

    if (!job) {
      await new Promise((r) => setTimeout(r, 2000));
      continue;
    }

    try {
      if (job.type === "export") {
        await exportJobHandler(job.payload);
      }

      if (job.type === "deploy") {
        await deployJobHandler(job.payload);
      }
    } catch (err) {
      console.error("Worker job failed:", err);
    }
  }
}

poll();
