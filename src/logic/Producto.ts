import { Categoria } from '../types/Categorias';

/**
 * Clase Abstracta Producto.
 * No se pueden crear objetos directamente de ella (instanciar).
 * Obliga a que todos los productos tengan estas propiedades base.
 */
export abstract class Producto {
    constructor(
        // 'readonly' hace que el ID no se pueda cambiar después de creado
        public readonly id: string,
        public nombre: string,
        public precio: number,
        public stock: number,
        public categoria: Categoria
    ) {}

    /**
     * Método abstracto: Cada tipo de producto (hijo) 
     * decidirá cómo mostrar sus propios detalles.
     */
    abstract obtenerDetalles(): string;

    /**
     * Lógica compartida: Actualizar stock de forma segura.
     */
    actualizarStock(cantidad: number): void {
        if (this.stock + cantidad < 0) {
            throw new Error(`Stock insuficiente para el producto: ${this.nombre}`);
        }
        this.stock += cantidad;
        console.log(`[Inventario] ${this.nombre} actualizado. Nuevo stock: ${this.stock}`);
    }
}