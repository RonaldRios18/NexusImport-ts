import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PedidosService {
  constructor(private prisma: PrismaService) {}

  async create(createPedidoDto: CreatePedidoDto) {
    return this.prisma.$transaction(async (tx) => {
      let totalCalculado = 0;
      const detallesParaGuardar: { productoId: string; cantidad: number; precioFijo: number }[] = [];

      for (const item of createPedidoDto.detalles) {
        // 1. Buscamos el producto
        const producto = await tx.producto.findUnique({ where: { id: item.productoId } });
        if (!producto || producto.estado !== 'ACTIVO') {
          throw new NotFoundException(`Producto ${item.productoId} no disponible`);
        }

        // 2. Buscamos stock en la SEDE seleccionada
        const inventario = await tx.inventarioSede.findUnique({
          where: { productoId_sedeId: { productoId: item.productoId, sedeId: createPedidoDto.sedeId } }
        });

        if (!inventario || inventario.cantidad < item.cantidad) {
          throw new BadRequestException(`Stock insuficiente para ${producto.nombre} en la sede elegida`);
        }

        totalCalculado += producto.precio * item.cantidad;

        detallesParaGuardar.push({
          productoId: producto.id,
          cantidad: item.cantidad,
          precioFijo: producto.precio
        });

        // 3. Descontamos el stock de la SEDE
        await tx.inventarioSede.update({
          where: { id: inventario.id },
          data: { cantidad: { decrement: item.cantidad } }
        });
      }

      // 4. Creamos el pedido con su estado inicial PENDIENTE
      return tx.pedido.create({
        data: {
          usuarioId: createPedidoDto.usuarioId,
          sedeId: createPedidoDto.sedeId,
          total: totalCalculado,
          detalles: { create: detallesParaGuardar }
        },
        include: { detalles: true }
      });
    });
  }

  async update(id: string, updatePedidoDto: UpdatePedidoDto) {
    // 1. Extraemos 'detalles' y guardamos el resto en 'dataAActualizar'
    const { detalles, ...dataAActualizar } = updatePedidoDto;

    return this.prisma.pedido.update({
      where: { id },
      // 2. Ahora sí, le pasamos solo los campos simples (total, estado, etc.)
      data: dataAActualizar,
    });
  }
  findAll() {
    return this.prisma.pedido.findMany({
      include: {
        usuario: { select: { nombre: true, email: true } },
        sede: { select: { nombre: true } },
        detalles: { include: { producto: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  // ELIMINAR = CANCELAR (Nunca se borra una transacción financiera)
  async remove(id: string) {
    return this.prisma.pedido.update({
      where: { id },
      data: { estado: 'CANCELADO' }
    });
  }
}