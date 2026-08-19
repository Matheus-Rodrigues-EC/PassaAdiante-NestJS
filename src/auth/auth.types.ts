import { UserType } from '../generated/prisma/enums.js';
export interface AuthUser {
  sub: string;
  email: string;
  type: UserType;
}
export interface AuthenticatedRequest extends Request {
  user: AuthUser;
}
