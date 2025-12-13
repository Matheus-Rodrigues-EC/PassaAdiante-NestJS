import { Injectable } from '@nestjs/common';

import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemsRepository } from './item.repository';

@Injectable()
export class ItemsService {
  constructor(
    private readonly itemRepository: ItemsRepository,
  ) {}

  getHealthItemService(): string {
    return 'Items Service is healthy';
  }

  async createItem(item: CreateItemDto) {
    return await this.itemRepository.create(item);
  }

  async findAllItems() {
    return await this.itemRepository.findAll();
  }

  async findOneItem(id: string) {
    return await this.itemRepository.findOne(id);
  }

  async updateItem(id: string, item: UpdateItemDto) {
    return await this.itemRepository.update(id, item);
  }

  async removeItem(id: string) {
    return await this.itemRepository.remove(id);
  }
}
