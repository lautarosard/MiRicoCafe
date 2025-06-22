// =================================================================
// ARCHIVO: Handlers/GestionarCarritoHandlers.js
// Responsabilidad: Manejar acciones dentro del carrito (editar, eliminar, vaciar).
// =================================================================

import { ObtenerCarrito, ActualizarCantidadEnCarrito, EliminarItemDelCarrito, VaciarCarrito } from './../APIs/Carrito.js';
import { GetByProductoId, UpdateProducto } from './../APIs/ProductoApi.js';

export function configurarPaginaCarrito(onCarritoChange) {
    const contenedorProductos = document.querySelector('#contenedor-productos-carrito');
    const botonVaciar = document.querySelector('#emptyCart');

    if (!contenedorProductos) return;

    // 🗑 Eliminar producto del carrito
    contenedorProductos.addEventListener('click', async (e) => {
        if (e.target.classList.contains('btn-eliminar-producto')) {
        const productoId = parseInt(e.target.dataset.id, 10);
        const clienteId = parseInt(localStorage.getItem("clienteId"), 10);

        if (!clienteId || isNaN(productoId)) {
            alert("Sesión inválida o producto no identificado.");
            return;
        }

        try {
            const carrito = await ObtenerCarrito(clienteId);
            const item = carrito?.productos?.find(p => p.idProducto === productoId);

            if (item) {
            const producto = await GetByProductoId(productoId);
            const nuevoStock = producto.stock + item.cantidad;
            await UpdateProducto(productoId, { ...producto, stock: nuevoStock });
            }

            await EliminarItemDelCarrito(clienteId, productoId);
            onCarritoChange();
        } catch (error) {
            console.error("Error al eliminar producto del carrito:", error);
            alert("Error al eliminar producto del carrito.");
        }
        }
    });

    // 🔁 Cambiar cantidad de un producto
    contenedorProductos.addEventListener('change', async (e) => {
        if (e.target.classList.contains('cantidad-input')) {
        const productoId = parseInt(e.target.dataset.id, 10);
        const clienteId = parseInt(localStorage.getItem("clienteId"), 10);

        let nuevaCantidad = parseInt(e.target.value, 10);
        if (!clienteId || isNaN(productoId) || isNaN(nuevaCantidad) || nuevaCantidad < 1) {
            alert("Cantidad inválida.");
            onCarritoChange();
            return;
        }

        try {
            const carrito = await ObtenerCarrito(clienteId);
            const item = carrito?.productos?.find(p => p.idProducto === productoId);
            if (!item) return;

            const producto = await GetByProductoId(productoId);
            const cantidadActual = item.cantidad;
            const stockDisponible = producto.stock + cantidadActual;

            if (nuevaCantidad > stockDisponible) {
            alert(`Solo hay ${stockDisponible} unidades disponibles.`);
            nuevaCantidad = stockDisponible;
            e.target.value = nuevaCantidad;
            }

            const nuevoStock = stockDisponible - nuevaCantidad;
            await UpdateProducto(productoId, { ...producto, stock: nuevoStock });
            await ActualizarCantidadEnCarrito(clienteId, productoId, nuevaCantidad);
            onCarritoChange();
        } catch (error) {
            console.error("Error al actualizar cantidad en el carrito:", error);
            alert("No se pudo actualizar la cantidad del producto.");
        }
        }
    });

    // 🧹 Vaciar carrito completo
    if (botonVaciar) {
        botonVaciar.addEventListener('click', async () => {
        const clienteId = parseInt(localStorage.getItem("clienteId"), 10);

        if (!clienteId) {
            alert("Debe iniciar sesión para vaciar el carrito.");
            return;
        }

        if (!confirm('¿Vaciar el carrito?')) return;

        try {
            await VaciarCarrito(clienteId);
            onCarritoChange();
            alert("Carrito vaciado exitosamente.");
        } catch (error) {
            console.error("Error al vaciar el carrito:", error);
            alert("No se pudo vaciar el carrito.");
        }
        });
    }
}