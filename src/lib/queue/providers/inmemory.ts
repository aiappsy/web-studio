export class InMemoryQueue {
  private tasks: any[] = [];
  private processing = false;

  async enqueue(job: any) {
    this.tasks.push(job);
    this.process();
  }

  private async process() {
    if (this.processing) return;

    this.processing = true;

    while (this.tasks.length > 0) {
      const job = this.tasks.shift();
      await job.handler(job.payload);
    }

    this.processing = false;
  }
}
