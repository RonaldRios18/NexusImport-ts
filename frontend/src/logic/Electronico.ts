import { Producto } from './Producto';
import { Categoria } from '../types/Categorias';

/**
 * Clase Electronico que hereda de Producto.
 * Representa productos tecnológicos importados.
 */
export class Electronico extends Producto {
    constructor(
        id: string,
        nombre: string,
        precio: number,
        stock: number,
        public garantiaMeses: number, // Propiedad específica de electrónicos
        public marca: string
    ) {
        // 'super' envía los datos al constructor del padre (Producto)
        super(id, nombre, precio, stock, Categoria.ELECTRONICA);
    }

    /**
     * Implementación obligatoria del método abstracto del padre.
     */
    obtenerDetalles(): string {
        return `[ELECTRÓNICO] ${this.nombre} - Marca: ${this.marca} - Garantía: ${this.garantiaMeses} meses.`;
    }
}