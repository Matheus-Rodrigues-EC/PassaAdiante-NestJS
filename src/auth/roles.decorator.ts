import { SetMetadata } from '@nestjs/common';
import { UserType } from '../generated/prisma/enums.js';
export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserType[]) => SetMetadata(ROLES_KEY, roles);
