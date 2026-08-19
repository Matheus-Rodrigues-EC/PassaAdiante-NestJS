import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthUser } from '../auth/auth.types.js';
import { ItemAvailability, UserType } from '../generated/prisma/enums.js';
import { ItemsRepository } from '../item/item.repository.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { UpdateOrderDto } from './dto/update-order.dto.js';
import { OrdersRepository } from './orders.repository.js';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orders: OrdersRepository,
    private readonly items: ItemsRepository,
  ) {}
  async create(user: AuthUser, input: CreateOrderDto) {
    const item = await this.items.findOne(input.itemId);
    if (!item) throw new NotFoundException('Item não encontrado');
    if (item.availability !== ItemAvailability.AVAILABLE)
      throw new ConflictException('Item indisponível');
    if (item.userId === user.sub)
      throw new ConflictException('Você não pode solicitar sua própria doação');
    try {
      return await this.orders.create(user.sub, item.id);
    } catch {
      throw new ConflictException('Você já solicitou este item');
    }
  }
  findAll() {
    return this.orders.findAll();
  }
  findForUser(id: string) {
    return this.orders.findForUser(id);
  }
  findReceived(id: string) {
    return this.orders.findReceived(id);
  }
  async findOne(id: string) {
    const order = await this.orders.findOne(id);
    if (!order) throw new NotFoundException('Pedido não encontrado');
    return order;
  }
  async update(user: AuthUser, id: string, input: UpdateOrderDto) {
    const order = await this.findOne(id);
    if (
      user.type !== UserType.ADMIN &&
      order.item.userId !== user.sub &&
      order.userId !== user.sub
    )
      throw new ForbiddenException('Você não pode alterar este pedido');
    return this.orders.updateStatus(id, input.status);
  }
  async remove(user: AuthUser, id: string) {
    const order = await this.findOne(id);
    if (user.type !== UserType.ADMIN && order.userId !== user.sub)
      throw new ForbiddenException('Você não pode excluir este pedido');
    return this.orders.remove(id);
  }
}
