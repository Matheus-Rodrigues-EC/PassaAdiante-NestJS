import { Injectable } from '@nestjs/common';
import { ItemAvailability, OrderStatus } from '../generated/prisma/enums.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class OrdersRepository {
  constructor(private readonly prisma: PrismaService) {}
  create(userId: string, itemId: string) {
    return this.prisma.order.create({
      data: { userId, itemId, status: OrderStatus.PENDING },
      include: { user: { select: { id: true, name: true } }, item: true },
    });
  }
  findAll() {
    return this.prisma.order.findMany({
      include: {
        user: { select: { id: true, name: true, email: true } },
        item: { include: { user: { select: { id: true, name: true } } } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
  findOne(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, email: true } },
        item: true,
      },
    });
  }
  findForUser(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      include: { item: true },
      orderBy: { createdAt: 'desc' },
    });
  }
  findReceived(userId: string) {
    return this.prisma.order.findMany({
      where: { item: { userId } },
      include: {
        user: { select: { id: true, name: true, email: true } },
        item: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }
  async updateStatus(id: string, status: OrderStatus) {
    return this.prisma.$transaction(async (tx) => {
      const order = await tx.order.update({
        where: { id },
        data: { status },
        include: { item: true, user: { select: { id: true, name: true } } },
      });
      if (status === OrderStatus.COMPLETED)
        await tx.item.update({
          where: { id: order.itemId },
          data: { availability: ItemAvailability.DONATED },
        });
      if (status === OrderStatus.CANCELED)
        await tx.item.update({
          where: { id: order.itemId },
          data: { availability: ItemAvailability.AVAILABLE },
        });
      return order;
    });
  }
  remove(id: string) {
    return this.prisma.order.delete({ where: { id } });
  }
}
