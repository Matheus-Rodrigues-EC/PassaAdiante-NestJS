import { ItemCategory, ItemCondition, ItemAvailability } from '@prisma/client';

export class Item {
  id: string;
  userId: string;
  name: string;
  description?: string;
  category: ItemCategory;
  condition: ItemCondition;
  availability: ItemAvailability;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    userId: string,
    name: string,
    category: ItemCategory,
    condition: ItemCondition,
    availability: ItemAvailability,
    description?: string,
  ) {
    this.id = id;
    this.userId = userId;
    this.name = name;
    this.category = category;
    this.condition = condition;
    this.availability = availability;
    this.description = description;
    this.createdAt = new Date(); 
    this.updatedAt = new Date();
  }
}
