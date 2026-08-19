import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { UserType } from '../../generated/prisma/enums.js';

export class UpdateUserDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsEnum(UserType) type?: UserType;
  @IsOptional() @IsString({ each: true }) phones?: string[];
  @IsOptional() @IsString() address?: string;
}
