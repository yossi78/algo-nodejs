import { Injectable } from '@nestjs/common';

/** Demonstrates a key-value map (Java's HashMap). */
@Injectable()
export class HashMapService {
  run(): string[] {
    const out: string[] = [];
    const map = new Map<number, string>();
    map.set(1, 'Apple');
    map.set(2, 'Banana');
    map.set(3, 'Cherry');

    for (const [key, value] of map) {
      out.push(`Key: ${key}, Value: ${value}`);
    }

    const searchKey = 2;
    if (map.has(searchKey)) {
      out.push(`Found by key ${searchKey}: ${map.get(searchKey)}`);
    }

    const searchValue = 'Cherry';
    if ([...map.values()].includes(searchValue)) {
      out.push(`Found value: ${searchValue}`);
    }
    return out;
  }
}

function main(): void {
  for (const line of new HashMapService().run()) {
    console.log(line);
  }
}

if (require.main === module) {
  main();
}
