import { Post } from '@prisma/client';

export class PostEntity implements Post {
  id: number; // so is no quick fix que preenche
  published: boolean;
  title: string;
  content: string;
  createdAt: Date;
  updateAt: Date;
  authorId: number;
}
