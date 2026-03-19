import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriasService {
  constructor(private prisma: PrismaService) {}

  create(createCategoriaDto: CreateCategoriaDto) {
    return this.prisma.categoria.create({
      data: createCategoriaDto,
    });
  }

  findAll() {
    // Solo mostramos categorías activas en el catálogo
    return this.prisma.categoria.findMany({
      where: { activo: true },
      include: {
        _count: {
          select: { productos: true }, // Útil para ver cuántos productos hay por categoría
        },
      },
    });
  }

  async findOne(id: string) {
    const categoria = await this.prisma.categoria.findUnique({
      where: { id },
      include: { productos: { where: { estado: 'ACTIVO' } } },
    });

    if (!categoria || !categoria.activo) {
      throw new NotFoundException(`La categoría con ID ${id} no existe o ha sido desactivada`);
    }

    return categoria;
  }

  update(id: string, updateCategoriaDto: UpdateCategoriaDto) {
    return this.prisma.categoria.update({
      where: { id },
      data: updateCategoriaDto,
    });
  }

  // REGLA DE ORO: Borrado Lógico
  async remove(id: string) {
    try {
      return await this.prisma.categoria.update({
        where: { id },
        data: { activo: false },
      });
    } catch (error) {
      throw new NotFoundException(`No se pudo desactivar: La categoría con ID ${id} no existe`);
    }
  }
}