import { IsString, IsNotEmpty } from 'class-validator';

export class CreateSedeDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre de la sede es obligatorio' })
  nombre: string;

  @IsString()
  @IsNotEmpty()
  direccion: string;

  @IsString()
  @IsNotEmpty()
  ciudad: string;
}