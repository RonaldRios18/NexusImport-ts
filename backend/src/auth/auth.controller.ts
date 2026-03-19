import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK) // Devuelve un 200 OK en lugar del 201 Created por defecto
  login(@Body() loginDto: CreateAuthDto) {
    return this.authService.login(loginDto);
  }
}