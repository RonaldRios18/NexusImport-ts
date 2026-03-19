import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateProveedorDto {
  @IsString()
  @IsNotEmpty({ message: 'La razón social es obligatoria' })
  razonSocial: string;

  @IsString()
  @IsNotEmpty({ message: 'El RUC es obligatorio' })
  ruc: string;

  @IsString()
  @IsNotEmpty()
  pais: string;

  @IsString()
  @IsOptional()
  contacto?: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}