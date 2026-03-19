import { Injectable } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductosService {
  constructor(private prisma: PrismaService) {}

  create(createProductoDto: CreateProductoDto) {
    // Extraemos proveedorId para manejarlo con cuidado
    const { proveedorId, ...datosProducto } = createProductoDto;

    return this.prisma.producto.create({
      data: {
        ...datosProducto,
        // Si viene un proveedorId, lo conectamos, si no, no hacemos nada
        ...(proveedorId && { proveedorId }), 
      },
    });
  }

  findAll() {
    return this.prisma.producto.findMany({
      include: {
        proveedor: true,
        inventarios: { include: { sede: true } } // Muestra el stock en cada sede
      },
    });
  }

  findOne(id: string) {
    return this.prisma.producto.findUnique({ 
      where: { id },
      include: {
        proveedor: true,
        inventarios: { include: { sede: true } }
      }
    });
  }

  update(id: string, updateProductoDto: UpdateProductoDto) {
    const { proveedorId, ...datosProducto } = updateProductoDto;
    return this.prisma.producto.update({
      where: { id },
      data: {
        ...datosProducto,
        ...(proveedorId && { proveedorId }),
      },
    });
  }

  remove(id: string) {
    return this.prisma.producto.delete({ where: { id } });
  }
}