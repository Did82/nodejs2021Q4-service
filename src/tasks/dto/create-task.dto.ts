import { IsEmpty, IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsInt()
  order: number;

  @IsString()
  description: string;

  @IsUUID()
  @IsOptional()
  userId: string;

  @IsUUID()
  @IsOptional()
  boardId: string;

  @IsUUID()
  @IsOptional()
  columnId: string;
}
