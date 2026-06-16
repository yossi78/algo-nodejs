import { Injectable } from '@nestjs/common';

/** Demonstrates a dynamic array (Java's ArrayList / List). */
@Injectable()
export class ListService {
  run(): string[] {
    const out: string[] = [];
    const list: string[] = [];
    list.push('Apple');
    list.push('Banana');
    list.push('Cherry');
    list.push('Apple'); // duplicate allowed

    for (let i = 0; i < list.length; i++) {
      out.push(`Index: ${i}, Value: ${list[i]}`);
    }

    const index = 2;
    if (index < list.length) {
      out.push(`Item at index ${index}: ${list[index]}`);
    }

    const searchValue = 'Banana';
    if (list.includes(searchValue)) {
      out.push(`List contains: ${searchValue}`);
    }

    out.push(`Index of 'Apple': ${list.indexOf('Apple')}`);
    return out;
  }
}
