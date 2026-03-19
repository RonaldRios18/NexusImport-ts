import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InventariosService {
  constructor(private prisma: PrismaService) {}

  // 1. Ver todo el stock global (Dashboard Admin)
  findAll() {
    return this.prisma.inventarioSede.findMany({
      include: {
        producto: { select: { nombre: true, precio: true, estado: true } },
        sede: { select: { nombre: true, ciudad: true } }
      }
    });
  }

  // 2. Ver stock de una sede específica
  async findBySede(sedeId: string) {
    return this.prisma.inventarioSede.findMany({
      where: { sedeId },
      include: { producto: true }
    });
  }

  // 3. INGRESO DE MERCADERÍA (Suma al stock existente)
  async ingresarStock(productoId: string, sedeId: string, cantidad: number) {
    if (cantidad <= 0) throw new BadRequestException('La cantidad a ingresar debe ser mayor a 0');

    return this.prisma.inventarioSede.upsert({
      where: { productoId_sedeId: { productoId, sedeId } },
      update: { cantidad: { increment: cantidad } }, // Suma atómica
      create: { productoId, sedeId, cantidad }
    });
  }

  // 4. AJUSTE MANUAL (Para corregir errores de inventario físico)
  async ajusteManual(productoId: string, sedeId: string, nuevaCantidad: number) {
    if (nuevaCantidad < 0) throw new BadRequestException('El stock no puede ser negativo');

    try {
      return await this.prisma.inventarioSede.update({
        where: { productoId_sedeId: { productoId, sedeId } },
        data: { cantidad: nuevaCantidad }
      });
    } catch (error) {
      throw new NotFoundException('No se encontró el registro de inventario para ajustar');
    }
  }

  // 5. Consultar stock de un producto específico en todas las sedes
  async findByProducto(productoId: string) {
    return this.prisma.inventarioSede.findMany({
      where: { productoId },
      include: { sede: true }
    });
  }
}