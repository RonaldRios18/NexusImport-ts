import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateSedeDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre de la sede es obligatorio' })
  nombre: string;

  @IsString()
  @IsNotEmpty({ message: 'La dirección es obligatoria' })
  direccion: string;

  @IsString()
  @IsNotEmpty({ message: 'La ciudad es obligatoria' })
  ciudad: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}