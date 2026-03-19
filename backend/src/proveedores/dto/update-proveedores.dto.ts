import { PartialType } from '@nestjs/mapped-types';
import { CreateProveedorDto } from './create-proveedores.dto';

export class UpdateProveedorDto extends PartialType(CreateProveedorDto) {}