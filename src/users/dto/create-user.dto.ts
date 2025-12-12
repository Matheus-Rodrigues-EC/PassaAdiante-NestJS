/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { UserType } from '../../generated/prisma/enums.js';

export class CreateUserDto {
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
  type: UserType;

  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  phones: string[];

  @IsString()
  address?: string;
}
