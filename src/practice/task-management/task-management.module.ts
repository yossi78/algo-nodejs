import { Module } from '@nestjs/common';
import { TaskManagerService } from './task-manager.service';
import { TaskManagementController } from './task-management.controller';

@Module({
  controllers: [TaskManagementController],
  providers: [TaskManagerService],
  exports: [TaskManagerService],
})
export class TaskManagementModule {}
