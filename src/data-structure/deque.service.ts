import { Injectable } from '@nestjs/common';

/** Demonstrates a double-ended queue (Java's ArrayDeque). */
@Injectable()
export class DequeService {
  run(): string[] {
    const out: string[] = [];
    const deque: number[] = [];

    // Add elements to both ends
    deque.unshift(1); // front
    deque.push(2); // back
    deque.unshift(0);

    out.push(`Deque: [${deque.join(', ')}]`);

    out.push(`First element: ${deque[0]}`);
    out.push(`Last element: ${deque[deque.length - 1]}`);

    out.push(`Removed first: ${deque.shift()}`);
    out.push(`Removed last: ${deque.pop()}`);

    out.push(`Deque after removals: [${deque.join(', ')}]`);

    const searchValue = 2;
    if (deque.includes(searchValue)) {
      out.push(`Deque contains: ${searchValue}`);
    }
    return out;
  }
}
