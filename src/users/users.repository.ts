/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto.js';
import { User } from './entities/user.entity.js';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async updatePassword(
    id: string,
    updateUserPasswordDto: UpdateUserPasswordDto,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(
      updateUserPasswordDto.password,
      10,
    );
    return await this.prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });
  }

  async remove(id: string): Promise<User> {
    return await this.prisma.user.delete({ where: { id } });
  }
}
