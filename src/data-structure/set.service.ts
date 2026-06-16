import { Injectable } from '@nestjs/common';

/** Demonstrates a Set (unique values, no index). */
@Injectable()
export class SetService {
  run(): string[] {
    const out: string[] = [];
    const set = new Set<number>();
    set.add(1);
    set.add(2);
    set.add(3);
    set.add(1); // duplicate

    for (const num of set) {
      out.push(`${num}`);
    }

    const searchValue = 2;
    if (set.has(searchValue)) {
      out.push(`Set contains: ${searchValue}`);
    }

    // NOTE: Set has no index, but we can simulate it
    const index = 1;
    let i = 0;
    for (const num of set) {
      if (i === index) {
        out.push(`Item at index ${index}: ${num}`);
        break;
      }
      i++;
    }
    return out;
  }
}

function main(): void {
  for (const line of new SetService().run()) {
    console.log(line);
  }
}

if (require.main === module) {
  main();
}
