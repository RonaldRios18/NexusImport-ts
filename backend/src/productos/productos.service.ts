import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductosService {
  constructor(private prisma: PrismaService) {}

  create(createProductoDto: CreateProductoDto) {
    return this.prisma.producto.create({
      data: createProductoDto,
    });
  }

  findAll() {
    return this.prisma.producto.findMany();
  }

  findOne(id: string) {
    return this.prisma.producto.findUnique({
      where: { id },
    });
  }

  update(id: string, updateProductoDto: UpdateProductoDto) {
    return this.prisma.producto.update({
      where: { id },
      data: updateProductoDto,
    });
  }

  remove(id: string) {
    return this.prisma.producto.delete({
      where: { id },
    });
  }
}