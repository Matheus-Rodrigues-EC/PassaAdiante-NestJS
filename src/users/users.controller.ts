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
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { UsersService } from './users.service.js';

@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}
  @Post() create(@Body() input: CreateUserDto) {
    return this.users.createUser(input);
  }
  @Get('me') @UseGuards(AuthGuard) me(@CurrentUser() user: AuthUser) {
    return this.users.findOneUser(user.sub);
  }
  @Get() @UseGuards(AuthGuard, RolesGuard) @Roles(UserType.ADMIN) findAll() {
    return this.users.findAllUsers();
  }
  @Get(':id') @UseGuards(AuthGuard, RolesGuard) @Roles(UserType.ADMIN) findOne(
    @Param('id') id: string,
  ) {
    return this.users.findOneUser(id);
  }
  @Patch(':id') @UseGuards(AuthGuard, RolesGuard) @Roles(UserType.ADMIN) update(
    @Param('id') id: string,
    @Body() input: UpdateUserDto,
  ) {
    return this.users.updateUser(id, input);
  }
  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserType.ADMIN)
  remove(@Param('id') id: string) {
    return this.users.removeUser(id);
  }
}
