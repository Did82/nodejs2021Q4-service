import { IsInt, IsString } from 'class-validator';

export class CreateColumnDto {
  @IsString()
  title: string;

  @IsInt()
  order: number;
}
