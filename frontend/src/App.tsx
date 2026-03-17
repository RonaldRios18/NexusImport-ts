import { useState, useEffect } from 'react'
import { Electronico } from './logic/Electronico'
import { Almacenamiento } from './logic/Almacenamiento';
import { Producto } from './logic/Producto';
import { ItemCarrito } from './types/Carrito';
import './App.css'

function App() {
  // 1. Estado para la lista de productos (Usamos la clase base Producto para Polimorfismo)
  const [productos, setProductos] = useState<Producto[]>([]);
  
  // 2. Estado para el carrito de compras
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);

  useEffect(() => {
    // Inicializamos datos de prueba
    const laptop = new Electronico("NP-001", "Laptop Gamer ASUS", 4500, 10, 12, "ASUS");
    const mouse = new Electronico("NP-002", "Mouse Logi MX", 350, 25, 6, "Logitech");
    const ssd = new Almacenamiento("ST-001", "Samsung 980 Pro", 600, 15, 1000, "SSD");

    setProductos([laptop, mouse, ssd]);
  }, []);

  // Función para gestionar el carrito
  const agregarAlCarrito = (producto: Producto) => {
    const itemExiste = carrito.find(item => item.id === producto.id);

    if (itemExiste) {
      if (itemExiste.cantidadSeleccionada < producto.stock) {
        setCarrito(carrito.map(item => 
          item.id === producto.id 
          ? { ...item, cantidadSeleccionada: item.cantidadSeleccionada + 1 }
          : item
        ));
      } else {
        alert("¡No hay más stock disponible!");
      }
    } else {
      setCarrito([...carrito, { 
        id: producto.id, 
        nombre: producto.nombre, 
        precio: producto.precio, 
        cantidadSeleccionada: 1 
      }]);
    }
  };

  return (
    <div className="container">
      <h1>NexusImport-TS 🚀</h1>
      <p>Panel de Gestión de Importaciones de Ronald</p>
      
      {/* SECCIÓN DE PRODUCTOS */}
      <div className="product-grid">
        {productos.map(prod => (
          <div key={prod.id} className="card">
            <h3>{prod.nombre}</h3>
            <p><strong>Precio:</strong> S/ {prod.precio}</p>
            <p><strong>Stock:</strong> {prod.stock} unidades</p>
            <p className="details">{prod.obtenerDetalles()}</p>
            
            <button 
              className="btn-agregar"
              onClick={() => {
                // Primero intentamos agregar al carrito
                agregarAlCarrito(prod);
                // Luego actualizamos el stock visualmente
                prod.actualizarStock(-1);
                setProductos([...productos]); 
              }}
              disabled={prod.stock <= 0}
            >
              {prod.stock > 0 ? 'Agregar al Carrito' : 'Agotado'}
            </button>
          </div>
        ))}
      </div>

      <hr style={{ margin: '40px 0' }} />

      {/* SECCIÓN DEL CARRITO (LO NUEVO) */}
      <div className="carrito-resumen">
        <h2>Tu Carrito 🛒</h2>
        {carrito.length === 0 ? (
          <p>El carrito está vacío. ¡Empieza a importar!</p>
        ) : (
          <>
            <ul className="carrito-lista">
              {carrito.map(item => (
                <li key={item.id} className="carrito-item">
                  <span><strong>{item.nombre}</strong> (x{item.cantidadSeleccionada})</span>
                  <span>S/ {item.precio * item.cantidadSeleccionada}</span>
                </li>
              ))}
            </ul>
            <div className="carrito-total">
              <h3>Total a Pagar: S/ {carrito.reduce((acc, item) => acc + (item.precio * item.cantidadSeleccionada), 0)}</h3>
              <button className="btn-finalizar" onClick={() => alert("Compra procesada con éxito")}>
                Finalizar Importación
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default App