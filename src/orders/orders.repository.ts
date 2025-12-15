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
}
