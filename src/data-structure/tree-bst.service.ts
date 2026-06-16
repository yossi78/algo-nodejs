import { Injectable } from '@nestjs/common';

/**
 * Demonstrates sorted collections (Java's TreeSet / TreeMap, both backed by a
 * red-black BST).
 *
 * JavaScript has no built-in sorted Set/Map, so this keeps the keys sorted on
 * insertion to reproduce the ordered iteration and min/max queries.
 */
@Injectable()
export class TreeBstService {
  run(): string[] {
    const out: string[] = [];

    // TreeSet (sorted, no duplicates)
    const treeSet = this.sortedInsert([], 5);
    this.sortedInsert(treeSet, 1);
    this.sortedInsert(treeSet, 3);
    this.sortedInsert(treeSet, 2);
    this.sortedInsert(treeSet, 1); // duplicate ignored

    out.push(`TreeSet (sorted): [${treeSet.join(', ')}]`);

    const searchValue = 3;
    if (treeSet.includes(searchValue)) {
      out.push(`TreeSet contains: ${searchValue}`);
    }

    out.push(`Min: ${treeSet[0]}`);
    out.push(`Max: ${treeSet[treeSet.length - 1]}`);

    // TreeMap (key-value, sorted by keys)
    const treeMap = new Map<number, string>();
    treeMap.set(3, 'Cherry');
    treeMap.set(1, 'Apple');
    treeMap.set(2, 'Banana');

    const sortedEntries = [...treeMap.entries()].sort((a, b) => a[0] - b[0]);
    out.push(
      `TreeMap (sorted by keys): {${sortedEntries
        .map(([k, v]) => `${k}=${v}`)
        .join(', ')}}`,
    );

    for (const [key, value] of sortedEntries) {
      out.push(`Key: ${key}, Value: ${value}`);
    }

    const key = 2;
    if (treeMap.has(key)) {
      out.push(`Found key ${key}: ${treeMap.get(key)}`);
    }
    return out;
  }

  private sortedInsert(arr: number[], value: number): number[] {
    if (arr.includes(value)) {
      return arr;
    }
    let i = 0;
    while (i < arr.length && arr[i] < value) {
      i++;
    }
    arr.splice(i, 0, value);
    return arr;
  }
}

function main(): void {
  for (const line of new TreeBstService().run()) {
    console.log(line);
  }
}

if (require.main === module) {
  main();
}
