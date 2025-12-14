import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
  } from '@nestjs/common';
  import { ItemsService } from './item.service';
  import { CreateItemDto } from './dto/create-item.dto';
  import { UpdateItemDto } from './dto/update-item.dto';
  
  @Controller('items')
  export class ItemsController {
    constructor(private readonly itemService: ItemsService) {}
  
    @Post('/create')
    @HttpCode(201)
    create(@Body() item: CreateItemDto) {
      return this.itemService.createItem(item);
    }
  
    @Get('/list')
    @HttpCode(200)
    findAll() {
      return this.itemService.findAllItems();
    }
  
    @Get(':id')
    @HttpCode(200)
    findOne(@Param('id') id: string) {
      return this.itemService.findOneItem(id);
    }
  
    @Patch(':id')
    @HttpCode(200)
    update(@Param('id') id: string, @Body() item: UpdateItemDto) {
      return this.itemService.updateItem(id, item);
    }
  
    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id') id: string) {
      return this.itemService.removeItem(id);
    }
  }
  