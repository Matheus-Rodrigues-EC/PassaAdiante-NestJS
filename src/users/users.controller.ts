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
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('/create')
  @HttpCode(201)
  create(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  @Get('/list')
  @HttpCode(200)
  findAll() {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    return this.userService.findOneUser(id);
  }

  @Patch(':id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return this.userService.updateUser(id, user);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.userService.removeUser(id);
  }
}
