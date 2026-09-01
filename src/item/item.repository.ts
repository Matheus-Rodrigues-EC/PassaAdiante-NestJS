import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

import { Item, Prisma } from '../generated/prisma/client';

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
    try {
      return await this.prisma.item.delete({
        where: { id },
      });
    } catch (error) {
      if (isForeignKeyRestrictError(error)) {
        throw new ConflictException(
          'Não é possível excluir um item que possui pedidos associados.',
        );
      }
      throw error;
    }
  }
}

// Postgres SQLSTATE para violação de FK: 23503 (foreign_key_violation) via
// PrismaClientKnownRequestError (P2003), ou 23001 (restrict_violation) via
// DriverAdapterError quando o Prisma usa o driver adapter (@prisma/adapter-pg).
function isForeignKeyRestrictError(error: unknown): boolean {
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === 'P2003'
  ) {
    return true;
  }

  const pgCode = (error as { cause?: { code?: string } })?.cause?.code;
  return pgCode === '23503' || pgCode === '23001';
}
