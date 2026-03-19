import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductosService {
  constructor(private prisma: PrismaService) {}

  create(createProductoDto: CreateProductoDto) {
    const { proveedorId, categoriaId, ...datosProducto } = createProductoDto;

    return this.prisma.producto.create({
      data: {
        ...datosProducto,
        categoriaId,
        ...(proveedorId && { proveedorId }),
      },
    });
  }

  findAll() {
    // Solo mostramos productos que no estén descontinuados para el catálogo general
    return this.prisma.producto.findMany({
      where: {
        estado: { not: 'DESCONTINUADO' }
      },
      include: {
        categoria: { select: { nombre: true } },
        inventarios: { select: { cantidad: true, sede: { select: { nombre: true } } } }
      },
    });
  }

  async findOne(id: string) {
    const producto = await this.prisma.producto.findUnique({
      where: { id },
      include: { categoria: true, proveedor: true, inventarios: true }
    });

    if (!producto) throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    return producto;
  }

  update(id: string, updateProductoDto: UpdateProductoDto) {
    const { proveedorId, categoriaId, ...datosProducto } = updateProductoDto;
    
    return this.prisma.producto.update({
      where: { id },
      data: {
        ...datosProducto,
        ...(categoriaId && { categoriaId }),
        ...(proveedorId && { proveedorId }),
      },
    });
  }

  // BORRADO LÓGICO PROFESIONAL
  remove(id: string) {
    return this.prisma.producto.update({
      where: { id },
      data: { estado: 'DESCONTINUADO' },
    });
  }
}