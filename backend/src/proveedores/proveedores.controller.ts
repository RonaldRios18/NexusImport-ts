import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ProveedoresService } from './proveedores.service';
import { CreateProveedorDto } from './dto/create-proveedores.dto';
import { UpdateProveedorDto } from './dto/update-proveedores.dto';

@Controller('proveedores')
export class ProveedoresController {
  constructor(private readonly proveedoresService: ProveedoresService) {}

  @Post()
  create(@Body() createProveedorDto: CreateProveedorDto) {
    return this.proveedoresService.create(createProveedorDto);
  }

  @Get()
  findAll() {
    return this.proveedoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.proveedoresService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateProveedorDto: UpdateProveedorDto) {
    return this.proveedoresService.update(id, updateProveedorDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.proveedoresService.remove(id);
  }
}