/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from '../generated/prisma/client.js';

@Injectable()
export class OrdersRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(createOrderDto: CreateOrderDto): Promise<Order> {
        return await this.prisma.order.create({
            data: {
                status: createOrderDto.status,
                user: {
                    connect: { id: createOrderDto.userId },
                },
                item: {
                    connect: { id: createOrderDto.itemId },
                },
            },
        });
    }

    async findAll(): Promise<Order[]> {
        return await this.prisma.order.findMany({
            include: {
                user: true,
                item: true,
            },
        });
    }

    async findOne(id: string): Promise<Order | null> {
        return await this.prisma.order.findUnique({
            where: { id },
            include: {
                user: true,
                item: true,
            },
        });
    }

    async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
        return await this.prisma.order.update({
            where: { id },
            data: updateOrderDto,
        });
    }

    async remove(id: string): Promise<Order> {
      return await this.prisma.order.delete({ where: { id } });
    }

}
