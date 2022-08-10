import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Email do usuário' }) // para o swagger
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Nome completo do usuário' }) // para o swagger
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Define se o usuário é administrador',
    default: false,
  }) // para o swagger
  @IsBoolean()
  admin: boolean;
}

// só estes 3 pois o id e o createdAt são automaticos
