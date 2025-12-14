import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

import { Item } from '../generated/prisma/client';

@Injectable()
export class ItemsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    return await this.prisma.item.create({
      data: {
        ...createItemDto,
      },
    });
  }

  async findAll(): Promise<Item[]> {
    return await this.prisma.item.findMany({
      include: {
        user: true,
      },
    });
  }

  async findOne(id: string): Promise<Item | null> {
    return await this.prisma.item.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
  }

  async findByUser(userId: string): Promise<Item[]> {
    return await this.prisma.item.findMany({
      where: { userId },
    });
  }

  async update(id: string, updateItemDto: UpdateItemDto): Promise<Item> {
    return await this.prisma.item.update({
      where: { id },
      data: updateItemDto,
    });
  }

  async remove(id: string): Promise<Item> {
    return await this.prisma.item.delete({
      where: { id },
    });
  }
}
