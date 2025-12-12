/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Item } from './entities/item.entity.js';
import { CreateItemDto } from './dto/create-item.dto.js';
import { UpdateItemDto } from './dto/update-item.dto.js';

@Injectable()
export class ItemsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const item = await this.prisma.item.create({
      data: {
        ...createItemDto,
      },
    });
    return item;
  }

  async findAll(): Promise<Item[]> {
    return await this.prisma.item.findMany();
  }

  async findOne(id: string): Promise<Item | null> {
    return await this.prisma.item.findUnique({ where: { id } });
  }

  async findByUser(userId: string): Promise<Item[]> {
    return await this.prisma.item.findMany({ where: { userId } });
  }

  async update(id: string, updateItemDto: UpdateItemDto): Promise<Item> {
    return await this.prisma.item.update({
      where: { id },
      data: updateItemDto,
    });
  }

  async remove(id: string): Promise<Item> {
    return await this.prisma.item.delete({ where: { id } });
  }
}
