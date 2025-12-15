import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepository: OrdersRepository,
  ){}

  getHealthOrderService(): string {
    return 'Orders Service is healthy';
  }

  async create(createOrderDto: CreateOrderDto) {
    return await this.orderRepository.create(createOrderDto);
  }

  async findAll() {
    return await this.orderRepository.findAll();
  }

  async findOne(id: string) {
    return await this.orderRepository.findOne(id);
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    return await this.orderRepository.update(id, updateOrderDto);
  }

  async remove(id: string) {
    return await this.orderRepository.remove(id);
  }
}
