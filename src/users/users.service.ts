import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { hash } from 'bcryptjs';

const salt = parseInt(process.env.SALT, 10);

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);
    user.password = await hash(user.password, salt);
    return this.usersRepository.save(user);
  }

  findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne(id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id);
    updateUserDto.password = await hash(updateUserDto.password, salt);
    const updateUser = await this.usersRepository
      .update(id, updateUserDto)
      .then(() => this.usersRepository.findOne(id));
    return updateUser;
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.usersRepository.delete(id);
  }
}
