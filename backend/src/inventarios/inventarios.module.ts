import { Module } from '@nestjs/common';
import { InventariosService } from './inventarios.service';
import { InventariosController } from './inventarios.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [InventariosController],
  providers: [InventariosService,PrismaService],
})
export class InventariosModule {}
