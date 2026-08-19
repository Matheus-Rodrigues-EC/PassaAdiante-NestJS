import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard.js';
import { CurrentUser } from '../auth/current-user.decorator.js';
import { AuthUser } from '../auth/auth.types.js';
import {
  ItemAvailability,
  ItemCategory,
  ItemCondition,
} from '../generated/prisma/enums.js';
import { CreateItemDto } from './dto/create-item.dto.js';
import { UpdateItemDto } from './dto/update-item.dto.js';
import { ItemsService } from './item.service.js';

@Controller('items')
export class ItemsController {
  constructor(private readonly items: ItemsService) {}
  @Post() @UseGuards(AuthGuard) create(
    @CurrentUser() user: AuthUser,
    @Body() input: CreateItemDto,
  ) {
    return this.items.createItem(user, input);
  }
  @Get() findAll(
    @Query('search') search?: string,
    @Query('category') category?: ItemCategory,
    @Query('condition') condition?: ItemCondition,
    @Query('availability') availability?: ItemAvailability,
    @Query('userId') userId?: string,
  ) {
    return this.items.findAllItems({
      search,
      category,
      condition,
      availability,
      userId,
    });
  }
  @Get(':id') findOne(@Param('id') id: string) {
    return this.items.findOneItem(id);
  }
  @Patch(':id') @UseGuards(AuthGuard) update(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() input: UpdateItemDto,
  ) {
    return this.items.updateItem(user, id, input);
  }
  @Delete(':id') @UseGuards(AuthGuard) remove(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
  ) {
    return this.items.removeItem(user, id);
  }
}
