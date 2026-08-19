import { IsEnum } from 'class-validator';
import { OrderStatus } from '../../generated/prisma/enums.js';
export class UpdateOrderDto {
  @IsEnum(OrderStatus) status: OrderStatus;
}
