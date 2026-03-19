import { Controller, Get, Post, Patch, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { InventariosService } from './inventarios.service';

@Controller('inventarios')
export class InventariosController {
  constructor(private readonly inventariosService: InventariosService) {}

  @Get()
  findAll() {
    return this.inventariosService.findAll();
  }

  @Get('sede/:sedeId')
  findBySede(@Param('sedeId', ParseUUIDPipe) sedeId: string) {
    return this.inventariosService.findBySede(sedeId);
  }

  @Get('producto/:productoId')
  findByProducto(@Param('productoId', ParseUUIDPipe) productoId: string) {
    return this.inventariosService.findByProducto(productoId);
  }

  // Entrada de mercadería (Suma)
  @Post('ingreso')
  ingresarStock(
    @Body('productoId', ParseUUIDPipe) productoId: string,
    @Body('sedeId', ParseUUIDPipe) sedeId: string,
    @Body('cantidad') cantidad: number,
  ) {
    return this.inventariosService.ingresarStock(productoId, sedeId, cantidad);
  }

  // Corrección de stock (Sobreescribe)
  @Patch('ajuste')
  ajusteManual(
    @Body('productoId', ParseUUIDPipe) productoId: string,
    @Body('sedeId', ParseUUIDPipe) sedeId: string,
    @Body('cantidad') cantidad: number,
  ) {
    return this.inventariosService.ajusteManual(productoId, sedeId, cantidad);
  }
}