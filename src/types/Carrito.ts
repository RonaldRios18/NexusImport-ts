import { Producto } from '../logic/Producto';

/**
 * Usamos 'Pick' para extraer solo lo necesario de la clase Producto.
 * Añadimos 'cantidadSeleccionada' para el control de la venta.
 */
export interface ItemCarrito extends Pick<Producto, 'id' | 'nombre' | 'precio'> {
    cantidadSeleccionada: number;
}

/**
 * Interfaz para representar el estado final de una venta.
 */
export interface Venta {
    readonly idVenta: string;
    fecha: Date;
    items: ItemCarrito[];
    total: number;
}