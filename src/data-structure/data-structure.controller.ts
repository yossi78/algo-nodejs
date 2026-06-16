import { Controller, Get } from '@nestjs/common';
import { ListService } from './list.service';
import { LinkedListService } from './linked-list.service';
import { SetService } from './set.service';
import { StackService } from './stack.service';
import { QueueService } from './queue.service';
import { DequeService } from './deque.service';
import { HashMapService } from './hash-map.service';
import { ConcurrentHashMapService } from './concurrent-hash-map.service';
import { TreeBstService } from './tree-bst.service';
import { GraphBfsService } from './graph-bfs.service';
import { PriorityQueueHeapService } from './priority-queue-heap.service';
import { PriorityBlockingQueueService } from './priority-blocking-queue.service';

@Controller('data-structure')
export class DataStructureController {
  constructor(
    private readonly list: ListService,
    private readonly linkedList: LinkedListService,
    private readonly set: SetService,
    private readonly stack: StackService,
    private readonly queue: QueueService,
    private readonly deque: DequeService,
    private readonly hashMap: HashMapService,
    private readonly concurrentHashMap: ConcurrentHashMapService,
    private readonly treeBst: TreeBstService,
    private readonly graphBfs: GraphBfsService,
    private readonly priorityQueueHeap: PriorityQueueHeapService,
    private readonly priorityBlockingQueue: PriorityBlockingQueueService,
  ) {}

  @Get('list')
  listExample(): { output: string[] } {
    return { output: this.list.run() };
  }

  @Get('linked-list')
  linkedListExample(): { output: string[] } {
    return { output: this.linkedList.run() };
  }

  @Get('set')
  setExample(): { output: string[] } {
    return { output: this.set.run() };
  }

  @Get('stack')
  stackExample(): { output: string[] } {
    return { output: this.stack.run() };
  }

  @Get('queue')
  queueExample(): { output: string[] } {
    return { output: this.queue.run() };
  }

  @Get('deque')
  dequeExample(): { output: string[] } {
    return { output: this.deque.run() };
  }

  @Get('hash-map')
  hashMapExample(): { output: string[] } {
    return { output: this.hashMap.run() };
  }

  @Get('concurrent-hash-map')
  concurrentHashMapExample(): { output: string[] } {
    return { output: this.concurrentHashMap.run() };
  }

  @Get('tree-bst')
  treeBstExample(): { output: string[] } {
    return { output: this.treeBst.run() };
  }

  @Get('graph-bfs')
  graphBfsExample(): { output: string[] } {
    return { output: this.graphBfs.run() };
  }

  @Get('priority-queue-heap')
  priorityQueueHeapExample(): { output: string[] } {
    return { output: this.priorityQueueHeap.run() };
  }

  @Get('priority-blocking-queue')
  priorityBlockingQueueExample(): { output: string[] } {
    return { output: this.priorityBlockingQueue.run() };
  }
}
