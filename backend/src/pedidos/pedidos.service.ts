import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PedidosService {
  constructor(private prisma: PrismaService) {}

  async create(createPedidoDto: CreatePedidoDto) {
    return this.prisma.$transaction(async (tx) => {
      // 1. Candado de seguridad: Para vender multi-sede, necesitamos saber de qué sede sale
      if (!createPedidoDto.sedeId) {
        throw new BadRequestException('Debe especificar el ID de la sede (sedeId) para despachar el pedido.');
      }

      let totalCalculado = 0;
      const detallesParaGuardar: { productoId: string; cantidad: number; precioFijo: number }[] = [];

      // 2. Recorremos el carrito
      for (const item of createPedidoDto.detalles) {
        // Buscamos el producto para obtener su precio real
        const producto = await tx.producto.findUnique({ where: { id: item.productoId } });
        if (!producto) {
          throw new NotFoundException(`El producto con ID ${item.productoId} no existe.`);
        }

        // 3. LA MAGIA MULTI-SEDE: Buscamos el stock exacto en la sede solicitada
        const inventario = await tx.inventarioSede.findUnique({
          where: {
            productoId_sedeId: {
              productoId: item.productoId,
              sedeId: createPedidoDto.sedeId,
            },
          },
        });

        // 4. Verificamos si existe el registro y si alcanza la cantidad
        if (!inventario || inventario.cantidad < item.cantidad) {
          throw new BadRequestException(`No hay stock suficiente para ${producto.nombre} en la sede seleccionada.`);
        }

        totalCalculado += producto.precio * item.cantidad;

        detallesParaGuardar.push({
          productoId: producto.id,
          cantidad: item.cantidad,
          precioFijo: producto.precio,
        });

        // 5. Descontamos el stock de la tabla InventarioSede (NO del Producto)
        await tx.inventarioSede.update({
          where: { id: inventario.id },
          data: { cantidad: inventario.cantidad - item.cantidad },
        });
      }

      // 6. Creamos el ticket final
      const nuevoPedido = await tx.pedido.create({
        data: {
          usuarioId: createPedidoDto.usuarioId,
          sedeId: createPedidoDto.sedeId,
          total: totalCalculado,
          detalles: { create: detallesParaGuardar },
        },
        include: { detalles: true },
      });

      return nuevoPedido;
    });
  }

  findAll() {
    return this.prisma.pedido.findMany({
      include: {
        usuario: { select: { nombre: true, email: true } },
        sede: { select: { nombre: true, ciudad: true } },
        detalles: { include: { producto: true } }
      }
    });
  }

  findOne(id: string) {
    return this.prisma.pedido.findUnique({
      where: { id },
      include: { detalles: { include: { producto: true } } }
    });
  }

  update(id: string, updatePedidoDto: UpdatePedidoDto) {
    const { detalles, ...dataAActualizar } = updatePedidoDto;
    return this.prisma.pedido.update({ 
      where: { id }, 
      data: dataAActualizar 
    });
  }

  remove(id: string) {
    return this.prisma.pedido.delete({ where: { id } });
  }
}