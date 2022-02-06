import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { LoginService } from './login.service';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  async login(@Request() req) {
    return this.loginService.login(req.user);
  }
}
