import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosModule } from './productos/productos.module';
import { PrismaService } from './prisma/prisma.service';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { SedesModule } from './sedes/sedes.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { EmpleadosModule } from './empleados/empleados.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { AuthModule } from './auth/auth.module';
import { InventariosModule } from './inventarios/inventarios.module';
import { CategoriasModule } from './categorias/categorias.module';

@Module({
  imports: [ProductosModule, ProveedoresModule, SedesModule, UsuariosModule, EmpleadosModule, PedidosModule, AuthModule, InventariosModule, CategoriasModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
