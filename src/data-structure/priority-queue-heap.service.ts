import { Injectable } from '@nestjs/common';
import { Heap } from '../common/heap';

/** Demonstrates a Heap via a priority queue (min-heap by default). */
@Injectable()
export class PriorityQueueHeapService {
  run(): string[] {
    const out: string[] = [];

    const pq = new Heap<number>((a, b) => a - b);
    pq.push(5);
    pq.push(1);
    pq.push(3);
    pq.push(2);

    out.push(`PriorityQueue: [${pq.toArray().join(', ')}]`);
    out.push(`Peek (min): ${pq.peek()}`);

    out.push('Polling elements:');
    while (!pq.isEmpty()) {
      out.push(`${pq.pop()}`);
    }

    // Max Heap (reverse order)
    const maxHeap = new Heap<number>((a, b) => b - a);
    maxHeap.push(5);
    maxHeap.push(1);
    maxHeap.push(3);
    out.push(`Max Heap peek: ${maxHeap.peek()}`);
    return out;
  }
}
