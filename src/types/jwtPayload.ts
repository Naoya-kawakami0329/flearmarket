import { UserStatus } from 'generated/prisma';

export type JwtPayload = {
  sub: string;
  username: string;
  status: UserStatus;
};
