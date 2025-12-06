import { env } from "@/lib/env";
import { InMemoryQueue } from "./providers/inmemory";
import { RedisQueue } from "./providers/redis";
import { CoolifyQueue } from "./providers/coolify";

export function createQueue() {
  switch (env.QUEUE_PROVIDER) {
    case "redis":
      return new RedisQueue(env.UPSTASH_REDIS_URL!);

    case "coolify":
      return new CoolifyQueue();

    default:
      return new InMemoryQueue();
  }
}

export const queue = createQueue();
