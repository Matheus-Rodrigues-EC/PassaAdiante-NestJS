import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard.js';
import { CurrentUser } from '../auth/current-user.decorator.js';
import { Roles } from '../auth/roles.decorator.js';
import { RolesGuard } from '../auth/roles.guard.js';
import { AuthUser } from '../auth/auth.types.js';
import { UserType } from '../generated/prisma/enums.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { UpdateOrderDto } from './dto/update-order.dto.js';
import { OrdersService } from './orders.service.js';

@Controller('orders')
@UseGuards(AuthGuard)
export class OrdersController {
  constructor(private readonly orders: OrdersService) {}
  @Post() create(@CurrentUser() user: AuthUser, @Body() input: CreateOrderDto) {
    return this.orders.create(user, input);
  }
  @Get('mine') mine(@CurrentUser() user: AuthUser) {
    return this.orders.findForUser(user.sub);
  }
  @Get('received') received(@CurrentUser() user: AuthUser) {
    return this.orders.findReceived(user.sub);
  }
  @Get() @UseGuards(RolesGuard) @Roles(UserType.ADMIN) findAll() {
    return this.orders.findAll();
  }
  @Get(':id') findOne(@Param('id') id: string) {
    return this.orders.findOne(id);
  }
  @Patch(':id') update(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() input: UpdateOrderDto,
  ) {
    return this.orders.update(user, id, input);
  }
  @Delete(':id') remove(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
  ) {
    return this.orders.remove(user, id);
  }
}
