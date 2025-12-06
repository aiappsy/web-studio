import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export class RedisQueue {
  redis: Redis;

  constructor(url: string) {
    this.redis = new Redis({ url });
  }

  async enqueue(job: any) {
    await this.redis.lpush("queue", JSON.stringify(job));
  }

  async getNext() {
    const value = await this.redis.rpop("queue");
    return value ? JSON.parse(value) : null;
  }
}
