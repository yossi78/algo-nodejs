import { Module } from '@nestjs/common';
import { DataStructureController } from './data-structure.controller';
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

@Module({
  controllers: [DataStructureController],
  providers: [
    ListService,
    LinkedListService,
    SetService,
    StackService,
    QueueService,
    DequeService,
    HashMapService,
    ConcurrentHashMapService,
    TreeBstService,
    GraphBfsService,
    PriorityQueueHeapService,
    PriorityBlockingQueueService,
  ],
  exports: [
    ListService,
    LinkedListService,
    SetService,
    StackService,
    QueueService,
    DequeService,
    HashMapService,
    ConcurrentHashMapService,
    TreeBstService,
    GraphBfsService,
    PriorityQueueHeapService,
    PriorityBlockingQueueService,
  ],
})
export class DataStructureModule {}
