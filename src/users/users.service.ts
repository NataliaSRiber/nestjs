import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';
// import { UnauthorizedError } from 'src/common/errors/types/UnauthorizedError';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersRepository } from './repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository) {}

  create(createUserDto: CreateUserDto) {
    return this.repository.create(createUserDto);
  }

  findAll() {
    // throw new UnauthorizedError('Não autorizado');
    return this.repository.findAll();
  }

  findOne(id: number): Promise<UserEntity> {
    const user = this.repository.findOne(id);
    if (!user) {
      throw new NotFoundError('Usuário não encontrado');
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.repository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.repository.remove(id);
  }
}
