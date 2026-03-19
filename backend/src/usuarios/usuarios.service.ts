import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async create(createUsuarioDto: CreateUsuarioDto) { // <-- 2. Le ponemos "async"
    // 3. Generamos la contraseña encriptada (10 es el nivel de seguridad)
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(createUsuarioDto.password, saltOrRounds);

    // 4. Guardamos en la base de datos reemplazando el password original por el encriptado
    return this.prisma.usuario.create({
      data: {
        ...createUsuarioDto, // Copiamos el nombre, email, rol, etc.
        password: hashedPassword, // Sobrescribimos la contraseña
      },
    });
  }

  findAll() {
    // Retornamos todos los usuarios (en el futuro ocultaremos el password aquí)
    return this.prisma.usuario.findMany();
  }

  findOne(id: string) {
    return this.prisma.usuario.findUnique({ where: { id } });
  }

  // Método clave que usaremos para el Login más adelante
  findByEmail(email: string) {
    return this.prisma.usuario.findUnique({ where: { email } });
  }

  update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    return this.prisma.usuario.update({
      where: { id },
      data: updateUsuarioDto,
    });
  }

  remove(id: string) {
    return this.prisma.usuario.delete({ where: { id } });
  }
}