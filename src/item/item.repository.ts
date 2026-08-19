import { Injectable } from '@nestjs/common';
import {
  ItemAvailability,
  ItemCategory,
  ItemCondition,
} from '../generated/prisma/enums.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateItemDto } from './dto/create-item.dto.js';
import { UpdateItemDto } from './dto/update-item.dto.js';

export interface ItemFilters {
  search?: string;
  category?: ItemCategory;
  condition?: ItemCondition;
  availability?: ItemAvailability;
  userId?: string;
}
@Injectable()
export class ItemsRepository {
  constructor(private readonly prisma: PrismaService) {}
  create(userId: string, input: CreateItemDto) {
    return this.prisma.item.create({
      data: {
        ...input,
        userId,
        availability: input.availability ?? ItemAvailability.AVAILABLE,
      },
      include: { user: { select: { id: true, name: true } } },
    });
  }
  findAll(filters: ItemFilters = {}) {
    return this.prisma.item.findMany({
      where: {
        category: filters.category,
        condition: filters.condition,
        availability: filters.availability,
        userId: filters.userId,
        OR: filters.search
          ? [
              { name: { contains: filters.search, mode: 'insensitive' } },
              {
                description: { contains: filters.search, mode: 'insensitive' },
              },
            ]
          : undefined,
      },
      include: { user: { select: { id: true, name: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }
  findOne(id: string) {
    return this.prisma.item.findUnique({
      where: { id },
      include: { user: { select: { id: true, name: true } }, orders: true },
    });
  }
  update(id: string, input: UpdateItemDto) {
    return this.prisma.item.update({ where: { id }, data: input });
  }
  setAvailability(id: string, availability: ItemAvailability) {
    return this.prisma.item.update({ where: { id }, data: { availability } });
  }
  remove(id: string) {
    return this.prisma.item.delete({ where: { id } });
  }
}
