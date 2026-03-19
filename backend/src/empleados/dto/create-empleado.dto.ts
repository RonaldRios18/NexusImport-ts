import { IsString, IsNotEmpty, IsNumber, Min, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { EstadoEmpleado } from '@prisma/client';

export class CreateEmpleadoDto {
  @IsString()
  @IsNotEmpty()
  dni: string;

  @IsString()
  @IsOptional()
  telefono?: string;

  @IsString()
  @IsNotEmpty()
  cargo: string;

  @IsNumber()
  @Min(0)
  salario: number;

  @IsEnum(EstadoEmpleado)
  @IsOptional()
  estado?: EstadoEmpleado;

  @IsUUID()
  @IsNotEmpty()
  sedeId: string;

  @IsUUID()
  @IsNotEmpty()
  usuarioId: string;
}