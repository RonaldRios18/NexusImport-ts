import { IsString, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

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

  @IsString()
  @IsNotEmpty()
  sedeId: string; // En qué sede trabaja

  @IsString()
  @IsNotEmpty()
  usuarioId: string; // Su cuenta de usuario para el login
}