import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { IsNumberString, IsUUID } from 'class-validator';

export class IdParams {
  @IsUUID()
  id: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
