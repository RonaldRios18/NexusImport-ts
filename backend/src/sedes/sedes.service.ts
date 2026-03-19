import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSedeDto } from './dto/create-sede.dto';
import { UpdateSedeDto } from './dto/update-sede.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SedesService {
  constructor(private prisma: PrismaService) {}

  create(createSedeDto: CreateSedeDto) {
    return this.prisma.sede.create({
      data: createSedeDto,
    });
  }

  findAll() {
    // Para el público o despacho, solo sedes activas
    return this.prisma.sede.findMany({
      where: { activo: true },
    });
  }

  async findOne(id: string) {
    const sede = await this.prisma.sede.findUnique({
      where: { id },
      include: {
        _count: {
          select: { empleados: true, inventarios: true }
        }
      }
    });

    if (!sede || !sede.activo) {
      throw new NotFoundException(`Sede con ID ${id} no encontrada o inactiva`);
    }
    return sede;
  }

  update(id: string, updateSedeDto: UpdateSedeDto) {
    return this.prisma.sede.update({
      where: { id },
      data: updateSedeDto,
    });
  }

  // BORRADO LÓGICO: Desactivar Sede
  async remove(id: string) {
    try {
      return await this.prisma.sede.update({
        where: { id },
        data: { activo: false },
      });
    } catch (error) {
      throw new NotFoundException(`No se pudo desactivar la sede con ID ${id}`);
    }
  }
}