import { IsOptional } from 'class-validator';

export class CreateFileDto {
  @IsOptional()
  filename: string;
}
