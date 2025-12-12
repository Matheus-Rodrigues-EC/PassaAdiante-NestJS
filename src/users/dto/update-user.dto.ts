/* eslint-disable @typescript-eslint/no-unsafe-call */
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto.js';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsDate,
  IsArray,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  phones: string[];

  @IsString()
  address?: string;

  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;

  @IsArray()
  @IsNotEmpty({ each: true })
  items: any[];

  @IsArray()
  @IsNotEmpty({ each: true })
  orders: any[];
}
