import { IsString, IsNotEmpty, IsNumber, Min, IsOptional, IsUrl, IsEnum } from 'class-validator';
import { EstadoProducto } from '@prisma/client';

export class CreateProductoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsNumber()
  @Min(0)
  precio: number;

  @IsString()
  @IsNotEmpty({ message: 'El ID de la categoría es obligatorio' })
  categoriaId: string;

  @IsOptional()
  @IsEnum(EstadoProducto, { message: 'Estado no válido' })
  estado?: EstadoProducto;

  @IsString()
  @IsOptional()
  @IsUrl({}, { message: 'La imagen debe ser una URL válida' })
  imagen?: string;

  @IsString()
  @IsOptional()
  marca?: string;

  @IsString()
  @IsOptional()
  detalles?: string;

  @IsString()
  @IsOptional()
  proveedorId?: string;
}