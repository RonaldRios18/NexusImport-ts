import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EmpleadosService {
  constructor(private prisma: PrismaService) {}

  create(createEmpleadoDto: CreateEmpleadoDto) {
    return this.prisma.empleado.create({ data: createEmpleadoDto });
  }

  findAll() {
    // Traemos a todos los empleados con su usuario y sede para el panel de RRHH
    return this.prisma.empleado.findMany({
      include: { usuario: true, sede: true }
    });
  }

  async findOne(id: string) {
    const empleado = await this.prisma.empleado.findUnique({
      where: { id },
      include: { usuario: true, sede: true }
    });
    if (!empleado) throw new NotFoundException('Empleado no encontrado');
    return empleado;
  }

  update(id: string, updateEmpleadoDto: UpdateEmpleadoDto) {
    return this.prisma.empleado.update({
      where: { id },
      data: updateEmpleadoDto
    });
  }

  // BORRADO LÓGICO EMPRESARIAL (DESPIDO)
  async remove(id: string) {
    const empleado = await this.findOne(id);

    return this.prisma.$transaction(async (tx) => {
      // 1. Cambiamos estado del empleado a DESPEDIDO
      const empActualizado = await tx.empleado.update({
        where: { id },
        data: { estado: 'DESPEDIDO' }
      });

      // 2. Bloqueamos su cuenta de usuario automáticamente
      await tx.usuario.update({
        where: { id: empleado.usuarioId },
        data: { estado: 'BLOQUEADO' }
      });

      return empActualizado;
    });
  }
}