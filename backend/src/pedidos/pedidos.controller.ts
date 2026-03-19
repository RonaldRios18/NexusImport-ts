import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  create(@Body() createPedidoDto: CreatePedidoDto) {
    return this.pedidosService.create(createPedidoDto);
  }

  @Get()
  findAll() {
    return this.pedidosService.findAll();
  }

 @Patch(':id')update(
  @Param('id', ParseUUIDPipe) id: string, 
  @Body() updatePedidoDto: UpdatePedidoDto
) {
  // Aquí estaba el error: Deben ser dos argumentos separados por coma
  return this.pedidosService.update(id, updatePedidoDto);
}

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.pedidosService.remove(id);
  }
}