import { Body, Controller, Post } from '@nestjs/common';
import { TaskManagerService } from './task-manager.service';

interface AddTaskDto {
  taskId: number;
  priority: number;
}

@Controller('practice/task-management')
export class TaskManagementController {
  constructor(private readonly taskManager: TaskManagerService) {}

  @Post('add')
  addTask(@Body() body: AddTaskDto): { added: AddTaskDto } {
    this.taskManager.addTask(body.taskId, body.priority);
    return { added: { taskId: body.taskId, priority: body.priority } };
  }

  @Post('next')
  next(): { taskId: number | null; priority: number | null } {
    const task = this.taskManager.getNextTask();
    return {
      taskId: task?.taskId ?? null,
      priority: task?.priority ?? null,
    };
  }

  /**
   * הדגמה עצמאית של הסדר שבו משימות יוצאות, בדומה ל-main() ב-Java.
   */
  @Post('demo')
  demo(): { order: number[] } {
    const manager = new TaskManagerService();
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
    return { order };
  }
}
