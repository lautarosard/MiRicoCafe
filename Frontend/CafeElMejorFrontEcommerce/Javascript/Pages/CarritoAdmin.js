// =================================================================
// ARCHIVO 5: pages/carrito-page.js
// Responsabilidad: Orquestar todo.
// =================================================================
import CarritoAPI from './../APIs/Carrito.js';
import { crearCardProductoCarrito } from './../Components/renderCarrito.js';
// ----> INICIO DE LA CORRECCIÓN <----
import { configurarPaginaProductos } from './../Handlers/AgregarProductoCarritoHandlers.js';
import { configurarPaginaCarrito } from './../Handlers/GestionarCarritoHandlers.js';
import {
    AgregarItemAlCarrito,
    ActualizarCantidadEnCarrito,
    EliminarItemDelCarrito,
    VaciarCarrito,
    ObtenerCarrito
} from './../APIs/Carrito.js';

// ----> FIN DE LA CORRECCIÓN <----

async function actualizarBurbujaCarrito() {
    const contadorBurbuja = document.getElementById('carrito-contador-burbuja');
    if (!contadorBurbuja) return;
    const productos = await CarritoAPI.get();
    const totalItems = productos.reduce((sum, producto) => sum + producto.quantity, 0);
    contadorBurbuja.textContent = totalItems;
    contadorBurbuja.classList.toggle('vacio', totalItems === 0);
}

async function renderizarPaginaCarrito() {
    const contenedorProductos = document.querySelector('#contenedor-productos-carrito');
    if (!contenedorProductos) return;
    const productos = await CarritoAPI.get();
    contenedorProductos.innerHTML = '';
    if (productos.length === 0) {
        contenedorProductos.innerHTML = '<p class="carrito-vacio-mensaje">Tu bolsa de compras está vacía.</p>';
    } else {
        const fragment = document.createDocumentFragment();
        productos.forEach(producto => fragment.appendChild(crearCardProductoCarrito(producto)));
        contenedorProductos.appendChild(fragment);
    }
    const totalItems = productos.reduce((sum, p) => sum + p.quantity, 0);
    const totalPrice = productos.reduce((sum, p) => sum + (p.price * p.quantity), 0);
    document.querySelector('#cantidad-productos-resumen').textContent = totalItems;
    document.querySelector('#subtotal-resumen').textContent = `$${totalPrice.toFixed(2)}`;
    document.querySelector('#total-resumen').textContent = `$${totalPrice.toFixed(2)}`;
    actualizarBurbujaCarrito();
}

export function iniciarLogicaCarrito() {
    configurarPaginaProductos(actualizarBurbujaCarrito);
    configurarPaginaCarrito(renderizarPaginaCarrito);
    actualizarBurbujaCarrito();
    renderizarPaginaCarrito();
}
