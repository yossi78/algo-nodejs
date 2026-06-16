/**
 * LRU Cache — תכנון מנגנון פינוי זיכרון מטמון (Least Recently Used).
 *
 * Time: O(1) per get/put. Space: O(capacity).
 *
 * Implemented with a doubly linked list + Map to mirror the Java version.
 * (A JS `Map` preserves insertion order, but the explicit list keeps the
 * O(1) move-to-front logic identical to the original implementation.)
 */
class Node {
  prev: Node | null = null;
  next: Node | null = null;

  constructor(
    readonly key: number,
    public value: number,
  ) {}
}

export class LruCache {
  private readonly map = new Map<number, Node>();
  private readonly head: Node;
  private readonly tail: Node;

  constructor(private readonly capacity: number) {
    this.head = new Node(0, 0);
    this.tail = new Node(0, 0);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  get(key: number): number {
    const node = this.map.get(key);
    if (node == null) {
      return -1;
    }
    this.moveToFront(node);
    return node.value;
  }

  put(key: number, value: number): void {
    const node = this.map.get(key);
    if (node != null) {
      node.value = value;
      this.moveToFront(node);
      return;
    }
    if (this.map.size === this.capacity) {
      this.evictLeastRecentlyUsed();
    }
    const newNode = new Node(key, value);
    this.map.set(key, newNode);
    this.insertAfterHead(newNode);
  }

  private moveToFront(node: Node): void {
    this.detach(node);
    this.insertAfterHead(node);
  }

  private insertAfterHead(node: Node): void {
    node.prev = this.head;
    node.next = this.head.next;
    (this.head.next as Node).prev = node;
    this.head.next = node;
  }

  private detach(node: Node): void {
    (node.prev as Node).next = node.next;
    (node.next as Node).prev = node.prev;
  }

  private evictLeastRecentlyUsed(): void {
    const lru = this.tail.prev as Node;
    this.detach(lru);
    this.map.delete(lru.key);
  }
}
