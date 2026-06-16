import { Injectable } from '@nestjs/common';

/**
 * Java's ConcurrentHashMap provides thread-safe, lock-striped operations like
 * `putIfAbsent` and `computeIfPresent` for concurrent access.
 *
 * Node.js executes JS on a single thread, so a plain `Map` is already safe for
 * synchronous mutation. This demo reproduces the same atomic-style helpers and
 * the "many concurrent updates" effect with a simple loop.
 */
@Injectable()
export class ConcurrentHashMapService {
  run(): string[] {
    const out: string[] = [];

    const stockMap = new Map<string, number>();
    stockMap.set('Apple', 100);
    stockMap.set('Banana', 150);
    stockMap.set('Cherry', 200);

    this.putIfAbsent(stockMap, 'Apple', 500); // no change, key exists
    this.putIfAbsent(stockMap, 'Date', 300); // added

    // Simulate 3 "threads" each applying 50 atomic increments.
    const updateTask = () => {
      for (let i = 0; i < 50; i++) {
        this.computeIfPresent(stockMap, 'Apple', (value) => value + 1);
      }
    };
    updateTask();
    updateTask();
    updateTask();

    for (const [key, value] of stockMap) {
      out.push(`Item: ${key}, Stock: ${value}`);
    }

    const searchKey = 'Banana';
    if (stockMap.has(searchKey)) {
      out.push(
        `Found key '${searchKey}' with stock: ${stockMap.get(searchKey)}`,
      );
    }
    return out;
  }

  private putIfAbsent<K, V>(map: Map<K, V>, key: K, value: V): void {
    if (!map.has(key)) {
      map.set(key, value);
    }
  }

  private computeIfPresent<K, V>(
    map: Map<K, V>,
    key: K,
    remap: (value: V) => V,
  ): void {
    if (map.has(key)) {
      map.set(key, remap(map.get(key) as V));
    }
  }
}

function main(): void {
  for (const line of new ConcurrentHashMapService().run()) {
    console.log(line);
  }
}

if (require.main === module) {
  main();
}
