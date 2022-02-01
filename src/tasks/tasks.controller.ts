import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { IdParams } from '../app.controller';

@Controller('boards/:boardId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(
    @Body() createTaskDto: CreateTaskDto,
    @Param('boardId') boardId: string,
  ) {
    createTaskDto.boardId = boardId;
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: IdParams) {
    return this.tasksService.findOne(params.id);
  }

  @Put(':id')
  update(@Param() params: IdParams, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(params.id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param() params: IdParams) {
    return this.tasksService.remove(params.id);
  }
}
