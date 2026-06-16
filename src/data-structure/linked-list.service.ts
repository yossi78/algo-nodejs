import { Injectable } from '@nestjs/common';

/**
 * Demonstrates a doubly-ended list (Java's LinkedList).
 *
 * JS arrays cover the same operations; `unshift` plays the role of `addFirst`.
 */
@Injectable()
export class LinkedListService {
  run(): string[] {
    const out: string[] = [];
    const list: string[] = [];
    list.push('Apple');
    list.push('Banana');
    list.push('Cherry');

    // Add at first and last
    list.unshift('First');
    list.push('Last');

    for (let i = 0; i < list.length; i++) {
      out.push(`Index: ${i}, Value: ${list[i]}`);
    }

    out.push(`First element: ${list[0]}`);
    out.push(`Last element: ${list[list.length - 1]}`);

    const removeIndex = list.indexOf('Banana');
    if (removeIndex !== -1) {
      list.splice(removeIndex, 1);
    }
    out.push(`After removing 'Banana': ${list.join(', ')}`);

    const searchValue = 'Cherry';
    if (list.includes(searchValue)) {
      out.push(`List contains: ${searchValue}`);
    }
    return out;
  }
}

function main(): void {
  for (const line of new LinkedListService().run()) {
    console.log(line);
  }
}

if (require.main === module) {
  main();
}
