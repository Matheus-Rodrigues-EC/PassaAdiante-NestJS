export enum ItemCategory {
  BOOK = 'book',
  NOTEBOOK = 'notebook',
  BACKPACK = 'backpack',
  PENCIL = 'pencil',
  PEN = 'pen',
  ERASER = 'eraser',
  PENCIL_CASE = 'pencil_case',
  UNIFORM = 'uniform',
  SHOES = 'shoes',
  SCHOOL_SUPPLIES = 'school_supplies',
}

export enum ItemCondition {
  NEW = 'new',
  GOOD = 'good',
  FAIR = 'fair',
}

export enum ItemAvailability {
  AVAILABLE = 'available',
  DONATED = 'donated',
}

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
