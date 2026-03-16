import { useState, useEffect } from 'react'
import { Electronico } from './logic/Electronico'
import { Almacenamiento } from './logic/Almacenamiento';
import { Producto } from './logic/Producto';
import './App.css'

function App() {
  // Estado para guardar nuestra lista de productos de importación
    const [productos, setProductos] = useState<Producto[]>([]);
  useEffect(() => {
    const laptop = new Electronico("NP-001", "Laptop Gamer ASUS", 4500, 10, 12, "ASUS");
  const mouse = new Electronico("NP-002", "Mouse Logi MX", 350, 25, 6, "Logitech");
  const ssd = new Almacenamiento("ST-001", "Samsung 980 Pro", 600, 15, 1000, "SSD");

  // Guardamos todos los tipos en la misma lista de Productos
  setProductos([laptop, mouse, ssd]);

  }, []);

  return (
    <div className="container">
      <h1>NexusImport-TS 🚀</h1>
      <p>Panel de Gestión de Importaciones</p>
      
      <div className="product-grid">
        {productos.map(prod => (
          <div key={prod.id} className="card">
            <h3>{prod.nombre}</h3>
            <p><strong>Marca:</strong> {prod.obtenerDetalles()}</p>
            <p><strong>Precio:</strong> S/ {prod.precio}</p>
            <p><strong>Stock:</strong> {prod.stock} unidades</p>
            <p className="details">{prod.obtenerDetalles()}</p>
            
            <button 
              onClick={() => {
                prod.actualizarStock(-1); // Usando tu método de la clase Producto
                setProductos([...productos]); // Refrescamos la vista
              }}
              disabled={prod.stock <= 0}
            >
              {prod.stock > 0 ? 'Vender' : 'Agotado'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App