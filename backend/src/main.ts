import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Activa las validaciones globales
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Bloquea datos que no estén en el DTO
    forbidNonWhitelisted: true, // Lanza error si envían campos "intrusos"
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();