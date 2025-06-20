/**
 * Este archivo es el punto de entrada y orquestador de toda la funcionalidad
 * relacionada con el carrito de compras en el frontend.
 */

// --- 1. IMPORTACIONES DE MÓDULOS ---
import CarritoAPI from '../APIs/CarritoApi.js';
import { crearCardProductoCarrito } from '../Components/renderCarrito.js';
import { configurarPaginaProductos } from '../Handlers/AgregarProductoCarritoHandlers.js';
import { configurarPaginaCarrito } from '../Handlers/GestionarCarritoHandlers.js';


// --- 2. FUNCIONES DE RENDERIZADO Y UI ---

/**
 * Actualiza la burbuja del ícono del carrito con la cantidad total de productos.
 * Esta función se llama cada vez que el carrito cambia.
 */
async function actualizarBurbujaCarrito() {
    const contadorBurbuja = document.getElementById('carrito-contador-burbuja');
    
    // PISTA DE DEPURACIÓN 1: ¿Encontramos el elemento HTML de la burbuja?
    if (!contadorBurbuja) {
        console.warn("ADVERTENCIA: No se encontró el elemento con id 'carrito-contador-burbuja' en el HTML. La burbuja no se puede actualizar.");
        return;
    }

    try {
        const productos = await CarritoAPI.get();
        const totalItems = productos.reduce((sum, producto) => sum + producto.quantity, 0);
        
        // PISTA DE DEPURACIÓN 2: ¿Qué número estamos calculando?
        console.log(`[Burbuja Carrito] Total de items calculados: ${totalItems}`);

        contadorBurbuja.textContent = totalItems;
        
        if (totalItems === 0) {
            contadorBurbuja.classList.add('vacio');
        } else {
            contadorBurbuja.classList.remove('vacio');
        }
    } catch (error) {
        console.error("Error al actualizar la burbuja del carrito:", error);
    }
}

/**
 * Renderiza la página completa del carrito: los productos en la bolsa
 * y el resumen de la compra.
 */
async function renderizarPaginaCarrito() {
    const contenedorProductos = document.querySelector('#contenedor-productos-carrito');
    const cantidadResumen = document.querySelector('#cantidad-productos-resumen');
    const subtotalResumenElem = document.querySelector('#subtotal-resumen');
    const totalResumenElem = document.querySelector('#total-resumen');

    // Si no encontramos el contenedor, significa que no estamos en la página del carrito.
    if (!contenedorProductos) return;

    try {
        const productos = await CarritoAPI.get();
        
        contenedorProductos.innerHTML = '';

        if (productos.length === 0) {
            contenedorProductos.innerHTML = '<p class="carrito-vacio-mensaje">Tu bolsa de compras está vacía.</p>';
        } else {
            const fragment = document.createDocumentFragment();
            productos.forEach(producto => {
                const card = crearCardProductoCarrito(producto);
                fragment.appendChild(card);
            });
            contenedorProductos.appendChild(fragment);
        }

        const totalItems = productos.reduce((sum, p) => sum + p.quantity, 0);
        const totalPrice = productos.reduce((sum, p) => sum + (p.price * p.quantity), 0);

        if (cantidadResumen) cantidadResumen.textContent = totalItems;
        if (subtotalResumenElem) subtotalResumenElem.textContent = `$${totalPrice.toFixed(2)}`;
        if (totalResumenElem) totalResumenElem.textContent = `$${totalPrice.toFixed(2)}`;

        // Actualizar la burbuja por si acaso, especialmente al cargar la página del carrito.
        actualizarBurbujaCarrito();

    } catch (error) {
        console.error("Error al renderizar la página del carrito:", error);
        contenedorProductos.innerHTML = '<p class="carrito-vacio-mensaje">Error al cargar el carrito.</p>';
    }
}


// --- 3. FUNCIÓN DE INICIALIZACIÓN ---

/**
 * Función principal que se exporta para iniciar toda la lógica del carrito.
 * Se debe llamar desde el script principal de la aplicación (ej: main.js).
 */
export function iniciarLogicaCarrito() {
    console.log("[Carrito] Iniciando lógica...");

    // 1. Configura la página de productos (si estamos en ella).
    configurarPaginaProductos(actualizarBurbujaCarrito);

    // 2. Configura la página del carrito (si estamos en ella).
    configurarPaginaCarrito(renderizarPaginaCarrito);

    // 3. Renderizado inicial:
    actualizarBurbujaCarrito();
    renderizarPaginaCarrito();
}