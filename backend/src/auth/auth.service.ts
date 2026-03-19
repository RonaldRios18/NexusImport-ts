import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async login(loginDto: CreateAuthDto) {
    // 1. Buscamos si el correo existe en la base de datos
    const usuario = await this.prisma.usuario.findUnique({
      where: { email: loginDto.email },
    });

    if (!usuario) {
      throw new UnauthorizedException('Correo o contraseña incorrectos');
    }

    // 2. Comparamos la contraseña que envió con la encriptada en la BD
    const isPasswordValid = await bcrypt.compare(loginDto.password, usuario.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Correo o contraseña incorrectos');
    }

    // 3. Si todo está bien, armamos el "Pase VIP" (Token)
    const payload = { 
      sub: usuario.id, 
      email: usuario.email, 
      rol: usuario.rol 
    };

    // 4. Se lo entregamos al cliente
    return {
      access_token: await this.jwtService.signAsync(payload),
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      }
    };
  }
}