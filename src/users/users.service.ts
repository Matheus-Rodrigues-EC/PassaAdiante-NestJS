import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { UsersRepository } from './users.repository.js';

@Injectable()
export class UsersService {
  constructor(private readonly users: UsersRepository) {}
  createUser(input: CreateUserDto) {
    return this.users.create(input);
  }
  findAllUsers() {
    return this.users.findAll();
  }
  async findOneUser(id: string) {
    const user = await this.users.findOne(id);
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }
  async updateUser(id: string, input: UpdateUserDto) {
    await this.findOneUser(id);
    return this.users.update(id, input);
  }
  async removeUser(id: string) {
    await this.findOneUser(id);
    return this.users.remove(id);
  }
}
