import { Injectable } from '@nestjs/common';
import { CreateProveedorDto } from './dto/create-proveedores.dto';
import { UpdateProveedorDto } from './dto/update-proveedores.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProveedoresService {
  constructor(private prisma: PrismaService) {}

  create(createProveedorDto: CreateProveedorDto) {
    return this.prisma.proveedor.create({
      data: createProveedorDto,
    });
  }

  findAll() {
    return this.prisma.proveedor.findMany();
  }

  findOne(id: string) {
    return this.prisma.proveedor.findUnique({ where: { id } });
  }

  update(id: string, updateProveedorDto: UpdateProveedorDto) {
    return this.prisma.proveedor.update({
      where: { id },
      data: updateProveedorDto,
    });
  }

  remove(id: string) {
    return this.prisma.proveedor.delete({ where: { id } });
  }
}