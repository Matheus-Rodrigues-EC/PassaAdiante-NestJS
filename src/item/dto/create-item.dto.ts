import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
import { ItemCategory, ItemCondition, ItemAvailability } from '../../generated/prisma/enums.js';

export class CreateItemDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsEnum(ItemCategory)
  category: ItemCategory;

  @IsNotEmpty()
  @IsEnum(ItemCondition)
  condition: ItemCondition;

  @IsNotEmpty()
  @IsEnum(ItemAvailability)
  availability: ItemAvailability;
}