import { IsString, IsNotEmpty, IsArray, ValidateNested, IsNumber, Min, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

// 1. Definimos cómo debe verse cada producto que entra en el carrito
class DetalleCarritoDto {
  @IsString()
  @IsNotEmpty()
  productoId: string;

  @IsNumber()
  @Min(1, { message: 'La cantidad mínima es 1' })
  cantidad: number;
}

// 2. Definimos cómo se ve el Pedido completo
export class CreatePedidoDto {
  @IsString()
  @IsNotEmpty()
  usuarioId: string; // El cliente que está comprando

  @IsString()
  @IsOptional()
  sedeId?: string; // Opcional: Desde qué sede se despachará

  @IsArray()
  @ValidateNested({ each: true }) // Valida cada elemento del arreglo
  @Type(() => DetalleCarritoDto) // Transforma el JSON al sub-DTO
  detalles: DetalleCarritoDto[]; // La lista de compras
}