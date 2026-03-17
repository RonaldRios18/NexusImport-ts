export class CreateProductoDto {
  nombre: string;
  precio: number;
  stock: number;
  categoria: string;
  marca?: string;     // El signo de interrogación significa que es opcional
  detalles?: string;  // Opcional
}