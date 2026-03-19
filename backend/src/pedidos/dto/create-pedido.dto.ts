import { IsString, IsNotEmpty, IsArray, ArrayMinSize, ValidateNested, IsOptional, IsEnum, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { EstadoPedido } from '@prisma/client';

class DetallePedidoDto {
  @IsUUID()
  @IsNotEmpty()
  productoId: string;

  @IsNotEmpty()
  cantidad: number;
}

export class CreatePedidoDto {
  @IsUUID()
  @IsNotEmpty()
  usuarioId: string;

  @IsUUID()
  @IsNotEmpty()
  sedeId: string;

  @IsArray()
  @ArrayMinSize(1, { message: 'El pedido debe tener al menos un producto' })
  @ValidateNested({ each: true })
  @Type(() => DetallePedidoDto)
  detalles: DetallePedidoDto[];

  @IsOptional()
  @IsEnum(EstadoPedido)
  estado?: EstadoPedido;
}