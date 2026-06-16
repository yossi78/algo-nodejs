import { Injectable } from '@nestjs/common';
import { Heap } from '../../common/heap';
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
