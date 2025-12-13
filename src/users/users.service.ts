import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
// import JWTService from '..auth/jwt/jwt.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { UsersRepository } from './users.repository.js';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository,
    // private readonly jwtService: JWTService,
  ) {}

  getHealthUserService(): string {
    return 'Users Service is healthy';
  }

  async createUser(user: CreateUserDto) {
    const userExists = await this.userRepository.findByEmail(user?.email || '');
    if (!userExists) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    return await this.userRepository.create(user);
  }

  async findAllUsers() {
    return await this.userRepository.findAll();
  }

  async findOneUser(id: string) {
    return await this.userRepository.findOne(id);
  }

  async updateUser(id: string, user: UpdateUserDto) {
    return await this.userRepository.update(id, user);
  }

  async removeUser(id: string) {
    return await this.userRepository.remove(id);
  }
}
