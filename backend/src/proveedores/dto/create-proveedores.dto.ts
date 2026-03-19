import { IsString, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateProveedorDto {
  @IsString()
  @IsNotEmpty({ message: 'La razón social no puede estar vacía' })
  razonSocial: string;

  @IsString()
  @IsNotEmpty()
  @Length(11, 11, { message: 'El RUC debe tener exactamente 11 caracteres' })
  ruc: string;

  @IsString()
  @IsNotEmpty()
  pais: string;

  @IsString()
  @IsOptional() 
  contacto?: string;
}