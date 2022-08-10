import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersRepository {
  // add os metodos que serão utilizados
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    // retorna uma promesa com um UserEntity
    return this.prisma.user.create({
      data: createUserDto,
      include: {
        posts: {
          select: {
            title: true,
            createdAt: true,
          },
        },
      },
    });
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.prisma.user.findMany({
      include: {
        posts: {
          select: {
            // sera acrescentado o post e a data de criação
            title: true,
            createdAt: true,
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<UserEntity> {
    // poderia ser o email que tbm é unico
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        posts: {
          select: {
            title: true,
            createdAt: true,
          },
        },
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: updateUserDto,
      include: {
        posts: {
          select: {
            title: true,
            createdAt: true,
          },
        },
      },
    });
  }

  async remove(id: number): Promise<UserEntity> {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
