import { Injectable } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';

interface ILoginUser {
  id: string;
  login: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, password: string): Promise<any> {
    const user = await this.usersRepository.findOne({ login });
    const isPasswordCorrect = await compare(password, user.password);
    if (user && isPasswordCorrect) {
      const { id, login } = user;
      return { id, login };
    }
    return null;
  }

  async login(user: ILoginUser) {
    const payload = { login: user.login, userId: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
