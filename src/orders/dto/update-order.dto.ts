import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { OrderStatus } from '../../generated/prisma/enums';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    @IsNotEmpty()
    @IsString()
    status: OrderStatus;

    @IsNotEmpty()
    @IsDate()
    updatedAt: Date;
}
