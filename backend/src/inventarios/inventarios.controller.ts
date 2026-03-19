import { Controller, Get, Post, Body } from '@nestjs/common';
import { InventariosService } from './inventarios.service';
import { CreateInventarioDto } from './dto/create-inventario.dto';

@Controller('inventarios')
export class InventariosController {
  constructor(private readonly inventariosService: InventariosService) {}

  @Post()
  ingresarMercaderia(@Body() createInventarioDto: CreateInventarioDto) {
    return this.inventariosService.ingresarMercaderia(createInventarioDto);
  }

  @Get()
  findAll() {
    return this.inventariosService.findAll();
  }
}