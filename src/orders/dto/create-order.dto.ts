import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { OrderStatus } from '../../generated/prisma/enums.js';

export class CreateOrderDto {
    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsString()
    itemId: string;

    @IsNotEmpty()
    @IsEnum(OrderStatus)
    status: OrderStatus;
}
