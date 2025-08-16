import { UserStatus } from 'generated/prisma';

export type RequestUser = {
  id: string;
  username: string;
  status: UserStatus;
};
