import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProveedorDto } from './dto/create-proveedores.dto';
import { UpdateProveedorDto } from './dto/update-proveedores.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProveedoresService {
  constructor(private prisma: PrismaService) {}

  create(createProveedorDto: CreateProveedorDto) {
    return this.prisma.proveedor.create({ data: createProveedorDto });
  }

  findAll() {
    return this.prisma.proveedor.findMany({
      where: { activo: true },
      include: { _count: { select: { productos: true } } }
    });
  }

  async findOne(id: string) {
    const proveedor = await this.prisma.proveedor.findUnique({ where: { id } });
    if (!proveedor) throw new NotFoundException('Proveedor no encontrado');
    return proveedor;
  }

  update(id: string, updateProveedorDto: UpdateProveedorDto) {
    return this.prisma.proveedor.update({
      where: { id },
      data: updateProveedorDto
    });
  }

  async remove(id: string) {
    return this.prisma.proveedor.update({
      where: { id },
      data: { activo: false }
    });
  }
}