import { IsString, IsEmail, IsEnum, IsOptional, MinLength } from 'class-validator';
import { EstadoUsuario } from '@prisma/client';

export class CreateUsuarioDto {
  @IsString()
  nombre: string;

  @IsString()
  @IsOptional()
  apellido?: string;

  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  password: string;

  @IsString()
  @IsOptional()
  rol?: string;

  @IsEnum(EstadoUsuario)
  @IsOptional()
  estado?: EstadoUsuario;
}