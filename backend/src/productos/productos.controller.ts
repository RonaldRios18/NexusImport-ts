import { 
  Controller, Get, Post, Body, Patch, Param, Delete, 
  ParseUUIDPipe, UseInterceptors, UploadedFile, BadRequestException 
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { CloudinaryService } from '../common/cloudinary/cloudinary.service';

@Controller('productos')
export class ProductosController {
  constructor(
    private readonly productosService: ProductosService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  // Creamos el producto en la base de datos (PostgreSQL vía Prisma)
  @Post()
  create(@Body() createProductoDto: CreateProductoDto) {
    return this.productosService.create(createProductoDto);
  }

  // Endpoint especializado para la carga de imágenes a Cloudinary
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    // 🛡️ Filtro de seguridad: Validamos la extensión antes de procesar el archivo
    fileFilter: (req, file, callback) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new BadRequestException('El formato de archivo no es válido. Solo imágenes.'), false);
      }
      callback(null, true);
    },
    // 📏 Limite de peso: 5MB para no saturar el almacenamiento
    limits: { fileSize: 1024 * 1024 * 5 }
  }))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    // Verificamos que el archivo realmente llegó al servidor
    if (!file) {
      throw new BadRequestException('Archivo requerido para la carga');
    }
    
    // Delegamos la subida al servicio de Cloudinary y retornamos la data necesaria para el Front
    const result = await this.cloudinaryService.uploadFile(file);
    return {
      url: result.secure_url,
      public_id: result.public_id
    };
  }

  // Obtenemos el listado completo de productos
  @Get()
  findAll() {
    return this.productosService.findAll();
  }

  // Buscamos un producto específico validando que el ID sea un UUID válido
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productosService.findOne(id);
  }

  // Actualización parcial de los datos del producto
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateProductoDto: UpdateProductoDto
  ) {
    return this.productosService.update(id, updateProductoDto);
  }

  // Eliminación (Recordando que aplicamos Soft Delete en el servicio)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productosService.remove(id);
  }
}