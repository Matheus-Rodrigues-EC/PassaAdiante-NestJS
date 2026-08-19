import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

export type SafeUser = Omit<User, 'password'>;
export const sanitizeUser = (user: User): SafeUser => {
  const safe = { ...user } as Partial<User>;
  delete safe.password;
  return safe as SafeUser;
};

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(input: CreateUserDto) {
    if (await this.findByEmail(input.email))
      throw new ConflictException('E-mail já cadastrado');
    const user = await this.prisma.user.create({
      data: {
        ...input,
        phones: input.phones ?? [],
        password: await bcrypt.hash(input.password, 10),
      },
    });
    return sanitizeUser(user);
  }
  async findAll() {
    return (
      await this.prisma.user.findMany({
        include: { items: true, orders: true },
      })
    ).map(sanitizeUser);
  }
  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user ? sanitizeUser(user) : null;
  }
  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
  async update(id: string, input: UpdateUserDto) {
    return sanitizeUser(
      await this.prisma.user.update({ where: { id }, data: input }),
    );
  }
  async remove(id: string) {
    return sanitizeUser(await this.prisma.user.delete({ where: { id } }));
  }
}
