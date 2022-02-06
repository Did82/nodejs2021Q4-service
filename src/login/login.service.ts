import { Injectable } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class LoginService {
  constructor(private authService: AuthService) {}
  login(createLoginDto: CreateLoginDto) {
    return this.authService.login(createLoginDto);
  }
}
