import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { IdParams } from '../app.controller';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.create(createBoardDto);
  }

  @Get()
  findAll() {
    return this.boardsService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: IdParams) {
    return this.boardsService.findOne(params.id);
  }

  @Put(':id')
  update(@Param() params: IdParams, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardsService.update(params.id, updateBoardDto);
  }

  @Delete(':id')
  remove(@Param() params: IdParams) {
    return this.boardsService.remove(params.id);
  }
}
