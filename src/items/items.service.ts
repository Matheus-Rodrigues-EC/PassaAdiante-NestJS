import { Injectable } from '@nestjs/common';
import { ItemsRepository } from './items.repository.js';
import { CreateItemDto } from './dto/create-item.dto.js';
import { UpdateItemDto } from './dto/update-item.dto.js';
import { Item } from './entities/item.entity.js';

@Injectable()
export class ItemsService {
  constructor(private readonly itemsRepository: ItemsRepository) {}

  create(createItemDto: CreateItemDto): Promise<Item> {
    return this.itemsRepository.create(createItemDto);
  }

  findAll(): Promise<Item[]> {
    return this.itemsRepository.findAll();
  }

  findOne(id: string): Promise<Item | null> {
    return this.itemsRepository.findOne(id);
  }

  findByUser(userId: string): Promise<Item[]> {
    return this.itemsRepository.findByUser(userId);
  }

  update(id: string, updateItemDto: UpdateItemDto): Promise<Item> {
    return this.itemsRepository.update(id, updateItemDto);
  }

  remove(id: string): Promise<Item> {
    return this.itemsRepository.remove(id);
  }
}
