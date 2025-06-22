
import { ObtenerCarrito } from './../APIs/Carrito.js';
import { crearCardProductoCarrito } from './../Components/renderCarrito.js';
import { configurarBotonesAgregarAlCarrito } from './../Handlers/AgregarProductoCarritoHandlers.js';
import { configurarPaginaCarrito } from './../Handlers/GestionarCarritoHandlers.js';

async function actualizarBurbujaCarrito() {
    const burbuja = document.getElementById('carrito-contador-burbuja');
    if (!burbuja) return;
    const productosCarrito = await ObtenerCarrito(1);
    const productos = productosCarrito.productos || []; // <- acceso correcto
    const total = productos.reduce((sum, p) => sum + p.cantidad, 0);
    burbuja.textContent = total;
    burbuja.classList.toggle('vacio', total === 0);
}

async function renderizarPaginaCarrito() {
    const contenedor = document.querySelector('#contenedor-productos-carrito');
    if (!contenedor) return;

    // Obtener el carrito completo
    const carrito = await ObtenerCarrito(1);

    // Accedemos a la propiedad 'productos' del carrito, o dejamos array vacío si no existe
    const productos = carrito?.items || [];

    contenedor.innerHTML = '';
    if (productos.length === 0) {
        contenedor.innerHTML = '<p class="carrito-vacio-mensaje">Tu carrito está vacío.</p>';
        console.log(carrito);
    } else {
        const fragment = document.createDocumentFragment();
        productos.forEach(p => fragment.appendChild(crearCardProductoCarrito(p)));
        contenedor.appendChild(fragment);
    }

    const totalItems = productos.reduce((s, p) => s + p.cantidad, 0);
    const totalPrice = carrito.total;

    document.querySelector('#cantidad-productos-resumen').textContent = totalItems;
    document.querySelector('#subtotal-resumen').textContent = `$${totalPrice.toFixed(2)}`;
    document.querySelector('#total-resumen').textContent = `$${totalPrice.toFixed(2)}`;

    actualizarBurbujaCarrito();
}

export function iniciarLogicaCarrito() {

    configurarBotonesAgregarAlCarrito(actualizarBurbujaCarrito);

    configurarPaginaCarrito(renderizarPaginaCarrito);
    actualizarBurbujaCarrito();
    renderizarPaginaCarrito();
}
