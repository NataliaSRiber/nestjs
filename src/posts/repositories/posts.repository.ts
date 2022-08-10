import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { PostEntity } from '../entities/post.entity';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';

// arquivo para trabalhar com o prisma

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto): Promise<PostEntity> {
    const { authorEmail } = createPostDto;
    // voce precisa do titulo e do content não do authoremail
    delete createPostDto.authorEmail;

    const user = await this.prisma.user.findUnique({
      where: {
        email: authorEmail, // transformando o authorEmail em um authorId, pois é com o email que relacionaremos o post ao usuário
      },
    });

    if (!user) {
      throw new NotFoundError('Author Not Found.');
    }

    const data: Prisma.PostCreateInput = {
      ...createPostDto, // pega tudo o recebido e coloca dentro deste objeto, com exceção do authoremail que foi deletado acima
      author: {
        connect: {
          email: authorEmail,
        }, // como já é verificado se o usuario existe só vamos conectar o email com o post
      },
    };

    return this.prisma.post.create({
      data,
    });
  }

  async findAll(): Promise<PostEntity[]> {
    return this.prisma.post.findMany({
      include: {
        author: {
          select: {
            name: true,
          },
        }, // ctrl + barra
      },
    });
  }

  async findOne(id: number): Promise<PostEntity> {
    return await this.prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        author: {
          select: {
            // ao exibir o post tarta estas infos do autor
            email: true,
          },
        },
      },
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<PostEntity> {
    const { authorEmail } = updatePostDto;

    if (!authorEmail) {
      return this.prisma.post.update({
        data: updatePostDto,
        where: { id },
      });
    }

    delete updatePostDto.authorEmail;

    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundError('Author not found');
    }

    const data: Prisma.PostUpdateInput = {
      ...updatePostDto,
      author: {
        connect: {
          email: authorEmail,
        },
      },
    };

    return this.prisma.post.update({
      where: {
        id,
      },
      data,
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async remove(id: number): Promise<PostEntity> {
    return this.prisma.post.delete({
      where: {
        id,
      },
    });
  }
}
