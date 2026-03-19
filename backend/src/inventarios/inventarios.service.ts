import { Injectable } from '@nestjs/common';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InventariosService {
  constructor(private prisma: PrismaService) {}

  // Este método recibe mercadería y suma el stock a la sede correcta
  async ingresarMercaderia(createInventarioDto: CreateInventarioDto) {
    const { productoId, sedeId, cantidad } = createInventarioDto;

    // "upsert" busca si la Laptop ya está en esa Sede.
    return this.prisma.inventarioSede.upsert({
      where: {
        productoId_sedeId: { productoId, sedeId },
      },
      // Si la laptop ya estaba en esa sede, le SUMA la nueva cantidad
      update: {
        cantidad: { increment: cantidad },
      },
      // Si es la primera vez que llega a esta sede, crea el registro
      create: {
        productoId,
        sedeId,
        cantidad,
      },
    });
  }

  findAll() {
    return this.prisma.inventarioSede.findMany({
      include: { producto: true, sede: true }
    });
  }
}