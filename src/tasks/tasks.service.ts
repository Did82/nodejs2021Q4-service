import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { Board } from '../boards/entities/board.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const board = await this.boardsRepository.findOne(createTaskDto.boardId);
    const task = this.taskRepository.create(createTaskDto);
    task.boardId = board.id;
    return await this.taskRepository.save(task);
  }

  async findAll() {
    return await this.taskRepository.find();
  }

  async findOne(id: string) {
    const task = await this.taskRepository.findOne(id);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.findOne(id);
    const updTask = await this.taskRepository.create(updateTaskDto);
    this.taskRepository.merge(task, updTask);
    return await this.taskRepository.save(task);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.taskRepository.delete(id);
    return `Task #${id} was deleted`;
  }
}
