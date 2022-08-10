import { User } from '@prisma/client';

export class UserEntity implements User {
  id: number;
  email: string;
  name: string;
  admin: boolean;
  createdAt: Date;
} // modifica o nome para Userentity e evita conflito com o User
