import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const { password, ...datos } = createUsuarioDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    return this.prisma.usuario.create({
      data: {
        ...datos,
        password: hashedPassword,
      },
    });
  }

  findAll() {
    // Solo mostramos usuarios que no estén bloqueados o inactivos si es necesario, 
    // pero para el ADMIN mostramos todos con su estado.
    return this.prisma.usuario.findMany();
  }

  async findOne(id: string) {
    const usuario = await this.prisma.usuario.findUnique({ where: { id } });
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    return usuario;
  }

  update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    return this.prisma.usuario.update({
      where: { id },
      data: updateUsuarioDto,
    });
  }

  // BORRADO LÓGICO
  remove(id: string) {
    return this.prisma.usuario.update({
      where: { id },
      data: { estado: 'INACTIVO' },
    });
  }
}