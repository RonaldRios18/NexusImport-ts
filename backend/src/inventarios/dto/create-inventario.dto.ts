import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateInventarioDto {
  @IsString()
  @IsNotEmpty()
  productoId: string;

  @IsString()
  @IsNotEmpty()
  sedeId: string;

  @IsNumber()
  @Min(1)
  cantidad: number;
}