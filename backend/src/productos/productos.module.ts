import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { PrismaService } from '../prisma/prisma.service'; // Importalo

@Module({
  controllers: [ProductosController],
  providers: [ProductosService, PrismaService], // Agrégalo aquí
})
export class ProductosModule {}