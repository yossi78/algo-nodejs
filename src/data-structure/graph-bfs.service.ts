import { Injectable } from '@nestjs/common';

/** Demonstrates breadth-first traversal over an adjacency-list graph. */
@Injectable()
export class GraphBfsService {
  run(): string[] {
    const out: string[] = [];

    const graph = new Map<number, number[]>();
    graph.set(1, [2, 3]);
    graph.set(2, [4]);
    graph.set(3, [4]);
    graph.set(4, []);

    const graphStr = [...graph.entries()]
      .map(([k, v]) => `${k}=[${v.join(', ')}]`)
      .join(', ');
    out.push(`Graph: {${graphStr}}`);

    out.push('BFS Traversal:');

    const queue: number[] = [];
    const visited = new Set<number>();

    const startNode = 1;
    queue.push(startNode);
    visited.add(startNode);

    while (queue.length > 0) {
      const node = queue.shift() as number;
      out.push(`Visited: ${node}`);

      for (const neighbor of graph.get(node) ?? []) {
        if (!visited.has(neighbor)) {
          queue.push(neighbor);
          visited.add(neighbor);
        }
      }
    }
    return out;
  }
}

function main(): void {
  for (const line of new GraphBfsService().run()) {
    console.log(line);
  }
}

if (require.main === module) {
  main();
}
