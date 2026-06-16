import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlgoModule } from '../algo/algo.module';
import { DataStructureModule } from '../data-structure/data-structure.module';
import { TaskManagementModule } from '../practice/task-management/task-management.module';

@Module({
  imports: [AlgoModule, DataStructureModule, TaskManagementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
