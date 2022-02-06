import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';
import { Columns } from './entities/column.entity';
import { Task } from '../tasks/entities/task.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>,
    @InjectRepository(Columns)
    private columnsRepository: Repository<Columns>,
    @InjectRepository(Board)
    private tasksRepository: Repository<Task>,
  ) {}

  async create(createBoardDto: CreateBoardDto) {
    const board = this.boardsRepository.create(createBoardDto);
    const columns = this.columnsRepository.create(createBoardDto.columns);
    await this.columnsRepository.save(columns);
    board.columns = columns;
    return this.boardsRepository.save(board);
  }

  async findAll() {
    return await this.boardsRepository.find();
  }

  async findOne(id: string) {
    const board = await this.boardsRepository.findOne(id);
    if (!board) throw new NotFoundException('Board not found');
    return board;
  }

  async update(id: string, updateBoardDto: UpdateBoardDto) {
    const board = await this.findOne(id);
    this.boardsRepository.merge(board, updateBoardDto);
    return await this.boardsRepository.save(board);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.boardsRepository.delete(id);
    return 'Board #${id} was deleted';
  }
}
