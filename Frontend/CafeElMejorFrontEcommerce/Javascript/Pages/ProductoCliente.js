import { GetAll } from './../APIs/ProductoApi.js';
import { renderCartaProductoPorCategoria } from './../Components/ProductoComponents/renderCartaProductos.js';
import { iniciarLogicaCarrito } from './CarritoAdmin.js';

export async function iniciarPaginaProductosCliente() {
    const contenedor = document.querySelector('#listProducts');
    if (!contenedor) return;

    contenedor.innerHTML = '';
    const productos = await GetAll();

    productos.forEach(producto => {
        const carta = renderCartaProductoPorCategoria(producto);  // Recibo nodo DOM
        contenedor.appendChild(carta);                             // Lo agrego al contenedor
    });

    iniciarLogicaCarrito();
}