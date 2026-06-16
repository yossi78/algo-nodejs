# algo-nodejs

A [NestJS](https://nestjs.com/) port of the Java `algorithms` learning project.
It mirrors the classes found in the Java project's `algo`, `data_structure`, and
`practice` folders, adapted to idiomatic Node.js / NestJS.

## Project structure

```
src/
├── common/
│   └── heap.ts                       # Generic binary heap (JS has no built-in PriorityQueue)
├── algo/                             # ← Java: com.learn.algorithms.algo
│   ├── *.service.ts                  # One @Injectable service per algorithm
│   ├── lru-cache.ts                  # Stateful class (constructed with a capacity)
│   ├── algo.controller.ts            # POST endpoints under /algo
│   └── algo.module.ts
├── data-structure/                   # ← Java: com.learn.algorithms.data_structure
│   ├── *.service.ts                  # One @Injectable demo per structure (returns output lines)
│   ├── data-structure.controller.ts  # GET endpoints under /data-structure
│   └── data-structure.module.ts
└── practice/
    └── task-management/              # ← Java: com.learn.algorithms.practice.taskManagment
        ├── task.ts
        ├── task-manager.service.ts
        ├── task-management.controller.ts
        └── task-management.module.ts
```

## Adaptation notes

- **`static solution(...)` → `@Injectable` service methods.** Each algorithm
  became a NestJS provider so it can be injected and unit-tested.
- **`main()` / `System.out.println` demos → controller endpoints** that return
  the output as a JSON array of strings instead of printing to stdout.
- **`PriorityQueue` / `PriorityBlockingQueue` → `common/heap.ts`.** JavaScript
  has no built-in heap, so a generic comparator-based binary heap backs the
  priority-queue demos and the task manager.
- **`TreeSet` / `TreeMap` → sorted arrays / sorted entries.** JS has no built-in
  sorted collections; ordering is reproduced on insertion / iteration.
- **Concurrency (`ConcurrentHashMap`, `synchronized`, `ExecutorService`,
  blocking `take()`) is largely a no-op in Node.js.** The event loop is
  single-threaded, so plain `Map`s are safe; the original atomic-style helpers
  and a Promise-based async `take()` are kept to preserve the intent.

## Endpoints

### `algo` (POST, JSON body)

| Endpoint | Body |
| --- | --- |
| `/algo/longest-unique-subarray` | `{ "a": number[] }` |
| `/algo/max-sum-subarray` | `{ "requests": number[], "k": number }` |
| `/algo/subarray-sum-equals-k` | `{ "packets": number[], "k": number }` |
| `/algo/minimum-window-subarray` | `{ "logs": number[], "targets": number[] }` |
| `/algo/max-network-capacity` | `{ "heights": number[] }` |
| `/algo/missing-packet-identifier` | `{ "packetIds": number[] }` |
| `/algo/attack-timeline-aggregator` | `{ "intervals": number[][] }` |
| `/algo/bracket-validator` | `{ "s": string }` |
| `/algo/rate-limit` | `{ "userId": string }` |
| `/algo/rate-limiter-log-cleaner` | `{ "timestamps": number[], "alerts": string[] }` |
| `/algo/lru-cache` | `{ "capacity": number, "operations": [{ "op": "get"\|"put", "key": number, "value"?: number }] }` |

### `data-structure` (GET)

`/data-structure/{list,linked-list,set,stack,queue,deque,hash-map,concurrent-hash-map,tree-bst,graph-bfs,priority-queue-heap,priority-blocking-queue}`

### `practice/task-management` (POST)

| Endpoint | Body |
| --- | --- |
| `/practice/task-management/add` | `{ "taskId": number, "priority": number }` |
| `/practice/task-management/next` | _(none)_ |
| `/practice/task-management/demo` | _(none)_ — replays the Java `main()` scenario |

## Running

```bash
npm install
npm run start        # http://localhost:3000
npm run start:dev    # watch mode
npm run build
npm test
```

### Quick example

```bash
curl -s -X POST localhost:3000/algo/longest-unique-subarray \
  -H 'Content-Type: application/json' -d '{"a":[1,2,1,3,4,2]}'
# {"result":4}
```
