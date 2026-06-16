import { Injectable } from '@nestjs/common';
import { Heap } from '../../data-structure/heap';
import { Task } from './task';

/**
 * מנהל משימות מבוסס תור עדיפויות.
 *
 * In Java this used ConcurrentHashMap + PriorityBlockingQueue for thread
 * safety; the Node.js event loop is single-threaded, so a Map + heap suffice.
 */
@Injectable()
export class TaskManagerService {
  private readonly taskMap = new Map<number, Task>();
  private readonly pbq = new Heap<Task>((a, b) => a.compareTo(b));

  addTask(taskId: number, priority: number): void {
    const task = new Task(taskId, priority);
    this.pbq.push(task);
    this.taskMap.set(taskId, task);
  }

  getNextTask(): Task | undefined {
    const task = this.pbq.pop();
    if (task != null && this.taskMap.has(task.taskId)) {
      this.taskMap.delete(task.taskId);
    }
    return task;
  }
}

function main(): void {
  const manager = new TaskManagerService();
  // [taskId, priority] — higher priority first; ties broken by insertion order.
  manager.addTask(33, 1);
  manager.addTask(40, 2);
  manager.addTask(11, 1);
  manager.addTask(20, 2);
  manager.addTask(22, 1);
  manager.addTask(60, 2);

  const order: number[] = [];
  for (let i = 0; i < 6; i++) {
    const task = manager.getNextTask();
    if (task) {
      order.push(task.taskId);
    }
  }

  const expected = [40, 20, 60, 33, 11, 22];
  console.log(
    `dequeue order = ${JSON.stringify(order)} (expected ${JSON.stringify(expected)}) ${JSON.stringify(order) === JSON.stringify(expected) ? 'PASS' : 'FAIL'}`,
  );
  console.log(
    `empty manager returns undefined: ${manager.getNextTask() === undefined ? 'PASS' : 'FAIL'}`,
  );
}

if (require.main === module) {
  main();
}
