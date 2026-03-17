import { Producto } from './Producto';
import { Categoria } from '../types/Categorias';

/**
 * Clase Almacenamiento.
 * Representa discos duros, SSDs y memorias.
 */
export class Almacenamiento extends Producto {
    constructor(
        id: string,
        nombre: string,
        precio: number,
        stock: number,
        public capacidadGB: number, // Ejemplo: 1000 para 1TB
        public tipo: 'SSD' | 'HDD'  // Usamos un Literal Type para limitar las opciones
    ) {
        // Enviamos los datos básicos al padre
        super(id, nombre, precio, stock, Categoria.ALMACENAMIENTO);
    }

    /**
     * Implementación personalizada para almacenamiento.
     */
    obtenerDetalles(): string {
        return `[ALMACENAMIENTO] Tipo: ${this.tipo} - Capacidad: ${this.capacidadGB}GB.`;
    }
}