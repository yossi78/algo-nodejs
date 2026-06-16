import { Injectable } from '@nestjs/common';

/** Demonstrates a Stack (LIFO) backed by an array. */
@Injectable()
export class StackService {
  run(): string[] {
    const out: string[] = [];
    const stack: number[] = [];
    stack.push(1);
    stack.push(2);
    stack.push(3);

    out.push(`Stack: [${stack.join(', ')}]`);
    out.push(`Top element (peek): ${stack[stack.length - 1]}`);
    out.push(`Popped: ${stack.pop()}`);
    out.push(`Stack after pop: [${stack.join(', ')}]`);

    const searchValue = 2;
    if (stack.includes(searchValue)) {
      out.push(`Stack contains: ${searchValue}`);
    }
    return out;
  }
}

function main(): void {
  for (const line of new StackService().run()) {
    console.log(line);
  }
}

if (require.main === module) {
  main();
}
