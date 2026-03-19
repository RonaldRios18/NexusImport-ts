import { IsString, IsNumber, IsOptional, Min, IsNotEmpty } from 'class-validator';

export class CreateProductoDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre del producto no puede estar vacío' })
  nombre: string;

  @IsNumber()
  @Min(0, { message: 'El precio no puede ser negativo' })
  precio: number;

  @IsNumber()
  @Min(0, { message: 'El stock no puede ser menor a 0' })
  stock: number;

  @IsString()
  @IsNotEmpty()
  categoria: string;

  @IsString()
  @IsOptional() // Al ser opcional, si no lo envían, no da error
  marca?: string;

  @IsString()
  @IsOptional()
  detalles?: string;
}