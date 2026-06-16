import { Injectable } from '@nestjs/common';
import { Heap } from './heap';

/**
 * Java's PriorityBlockingQueue is a thread-safe, unbounded priority queue whose
 * `take()` blocks while empty (used in producer-consumer scenarios).
 *
 * Node.js is single-threaded with an async event loop, so there is no blocking
 * `take`. This demo mirrors the priority-ordering behaviour and exposes an
 * async `take()` that resolves once an element is available.
 */
@Injectable()
export class PriorityBlockingQueueService {
  private readonly pbq = new Heap<number>((a, b) => a - b);
  private readonly waiters: Array<(value: number) => void> = [];

  put(value: number): void {
    const waiter = this.waiters.shift();
    if (waiter) {
      waiter(value);
      return;
    }
    this.pbq.push(value);
  }

  /** Async analogue of Java's blocking `take()`. */
  take(): Promise<number> {
    const value = this.pbq.pop();
    if (value !== undefined) {
      return Promise.resolve(value);
    }
    return new Promise<number>((resolve) => this.waiters.push(resolve));
  }

  run(): string[] {
    const out: string[] = [];

    this.put(10);
    this.put(5);
    this.put(20);

    out.push(
      `PriorityBlockingQueue initialized: [${this.pbq.toArray().join(', ')}]`,
    );

    out.push('Polling elements (in priority order):');
    while (!this.pbq.isEmpty()) {
      out.push(`Processed: ${this.pbq.pop()}`);
    }
    return out;
  }
}

function main(): void {
  for (const line of new PriorityBlockingQueueService().run()) {
    console.log(line);
  }
}

if (require.main === module) {
  main();
}
