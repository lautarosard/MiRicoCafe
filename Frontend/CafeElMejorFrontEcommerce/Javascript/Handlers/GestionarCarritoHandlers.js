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
                // Obtener el carrito del cliente
                const carrito = await ObtenerCarrito(clienteId);
                const item = carrito.items.find(p => p.productoId === productoId);

                if (item) {
                    const producto = await GetByProductoId(productoId);

                    // ✅ Actualizar stock correctamente
                    const nuevoStock = producto.stock + item.cantidad; // Incrementa únicamente la cantidad que estaba en el carrito
                    await UpdateProducto(productoId, { ...producto, stock: nuevoStock });

                    // ✅ Eliminar el producto del carrito
                    await EliminarItemDelCarrito(clienteId, productoId);

                    onCarritoChange(); // Refrescar la interfaz
                } else {
                    console.error("El producto no fue encontrado en el carrito.");
                }
            } catch (error) {
                console.error("Error al eliminar producto del carrito:", error);
                alert("No se pudo eliminar el producto del carrito.");
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
                const item = carrito.items.find(p => p.productoId === productoId);
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