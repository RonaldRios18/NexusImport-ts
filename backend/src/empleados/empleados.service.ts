import { Injectable } from '@nestjs/common';
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
    return this.prisma.empleado.findMany({
      include: { sede: true, usuario: { select: { nombre: true, email: true, rol: true } } }
    });
  }

  findOne(id: string) {
    return this.prisma.empleado.findUnique({ 
      where: { id },
      include: { sede: true, usuario: { select: { nombre: true, email: true, rol: true } } }
    });
  }

  update(id: string, updateEmpleadoDto: UpdateEmpleadoDto) {
    return this.prisma.empleado.update({ where: { id }, data: updateEmpleadoDto });
  }

  remove(id: string) {
    return this.prisma.empleado.delete({ where: { id } });
  }
}