import { Injectable } from '@nestjs/common';

/** Demonstrates a Queue (FIFO) backed by an array. */
@Injectable()
export class QueueService {
  run(): string[] {
    const out: string[] = [];
    const queue: number[] = [];
    queue.push(1);
    queue.push(2);
    queue.push(3);
    out.push(`Queue: [${queue.join(', ')}]`);

    out.push(`Head element (peek): ${queue[0]}`);
    out.push(`Removed: ${queue.shift()}`);
    out.push(`Queue after poll: [${queue.join(', ')}]`);

    const searchValue = 2;
    if (queue.includes(searchValue)) {
      out.push(`Queue contains: ${searchValue}`);
    }
    return out;
  }
}

function main(): void {
  for (const line of new QueueService().run()) {
    console.log(line);
  }
}

if (require.main === module) {
  main();
}
