import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosModule } from './productos/productos.module';
import { PrismaService } from './prisma/prisma.service';
import { ProveedoresModule } from './proveedores/proveedores.module';

@Module({
  imports: [ProductosModule, ProveedoresModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
