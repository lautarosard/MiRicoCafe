import { GetAll } from './APIs/ProductoApi.js';
import { renderCartaProductoPorCategoria } from './Components/ProductoComponents/renderCartaProductos.js';
import { iniciarLogicaCarrito } from './Pages/CarritoAdmin.js';

async function cargarProductos() {
    try {
        const productos = await GetAll();

        console.log("Productos recibidos:", productos); // ✅ Verificá esto en consola

        productos.forEach(producto => {
            console.log("Renderizando producto:", producto); // Debug extra
            renderCartaProductoPorCategoria(producto);
        });
    } catch (error) {
        console.error("Error al cargar productos:", error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();        // 🔹 Cargar productos y renderizarlos
    iniciarLogicaCarrito();   // 🔹 Configura carrito y botones
});