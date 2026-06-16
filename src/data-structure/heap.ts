/**
 * Generic binary heap (priority queue).
 *
 * JavaScript/TypeScript has no built-in heap, so this is the shared primitive
 * used to mirror Java's `PriorityQueue` / `PriorityBlockingQueue` semantics.
 *
 * The comparator follows the Java `Comparator<T>` contract:
 *   - negative  -> `a` has higher priority (comes out first)
 *   - zero      -> equal priority
 *   - positive  -> `b` has higher priority
 *
 * Time: O(log n) for `push` / `pop`, O(1) for `peek`.
 */
export class Heap<T> {
  private readonly items: T[] = [];

  constructor(private readonly comparator: (a: T, b: T) => number) {}

  get size(): number {
    return this.items.length;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  peek(): T | undefined {
    return this.items[0];
  }

  push(value: T): void {
    this.items.push(value);
    this.bubbleUp(this.items.length - 1);
  }

  pop(): T | undefined {
    if (this.items.length === 0) {
      return undefined;
    }
    const top = this.items[0];
    const last = this.items.pop() as T;
    if (this.items.length > 0) {
      this.items[0] = last;
      this.bubbleDown(0);
    }
    return top;
  }

  contains(predicate: (value: T) => boolean): boolean {
    return this.items.some(predicate);
  }

  toArray(): T[] {
    return [...this.items];
  }

  private bubbleUp(index: number): void {
    while (index > 0) {
      const parent = (index - 1) >> 1;
      if (this.comparator(this.items[index], this.items[parent]) >= 0) {
        break;
      }
      this.swap(index, parent);
      index = parent;
    }
  }

  private bubbleDown(index: number): void {
    const length = this.items.length;
    while (true) {
      const left = index * 2 + 1;
      const right = index * 2 + 2;
      let smallest = index;

      if (
        left < length &&
        this.comparator(this.items[left], this.items[smallest]) < 0
      ) {
        smallest = left;
      }
      if (
        right < length &&
        this.comparator(this.items[right], this.items[smallest]) < 0
      ) {
        smallest = right;
      }
      if (smallest === index) {
        break;
      }
      this.swap(index, smallest);
      index = smallest;
    }
  }

  private swap(i: number, j: number): void {
    [this.items[i], this.items[j]] = [this.items[j], this.items[i]];
  }
}

function main(): void {
  // Min-heap: elements should pop in ascending order.
  const minHeap = new Heap<number>((a, b) => a - b);
  [5, 1, 3, 2, 4].forEach((n) => minHeap.push(n));
  const minOrder: number[] = [];
  while (!minHeap.isEmpty()) {
    minOrder.push(minHeap.pop() as number);
  }
  const minExpected = [1, 2, 3, 4, 5];
  console.log(
    `min-heap pop order = ${JSON.stringify(minOrder)} (expected ${JSON.stringify(minExpected)}) ${JSON.stringify(minOrder) === JSON.stringify(minExpected) ? 'PASS' : 'FAIL'}`,
  );

  // Max-heap: reversed comparator pops in descending order.
  const maxHeap = new Heap<number>((a, b) => b - a);
  [5, 1, 3, 2, 4].forEach((n) => maxHeap.push(n));
  console.log(
    `max-heap peek = ${maxHeap.peek()} (expected 5) ${maxHeap.peek() === 5 ? 'PASS' : 'FAIL'}`,
  );
  console.log(
    `empty heap pop = ${minHeap.pop()} (expected undefined) ${minHeap.pop() === undefined ? 'PASS' : 'FAIL'}`,
  );
}

if (require.main === module) {
  main();
}
