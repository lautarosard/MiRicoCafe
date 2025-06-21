// =================================================================
// ARCHIVO 4: Handlers/GestionarCarritoHandler.js
// Responsabilidad: Manejar acciones dentro de la página del carrito.
// =================================================================
import CarritoAPI from './../APIs/Carrito.js';
import { GetByProductoId, UpdateProducto } from './../APIs/ProductoApi.js';

export function configurarPaginaCarrito(onCarritoChange) {
    const contenedorProductos = document.querySelector('#contenedor-productos-carrito');
    const botonVaciar = document.querySelector('#emptyCart');
    if (!contenedorProductos) return;

    // Eliminar producto del carrito
    contenedorProductos.addEventListener('click', async (e) => {
        if (e.target.classList.contains('btn-eliminar-producto')) {
            const productoId = parseInt(e.target.dataset.id, 10);
            try {
                const producto = await GetByProductoId(productoId);
                const carrito = await CarritoAPI.get();
                const itemCarrito = carrito.find(p => p.id === productoId);

                if (itemCarrito) {
                    const nuevoStock = producto.stock + itemCarrito.quantity;
                    await UpdateProducto(productoId, { ...producto, stock: nuevoStock });
                }

                await CarritoAPI.remove(productoId);
                onCarritoChange();

            } catch (error) {
                console.error("Error al eliminar producto del carrito:", error);
                alert("No se pudo eliminar el producto.");
            }
        }
    });

    // Cambiar cantidad desde input
    contenedorProductos.addEventListener('change', async (e) => {
        if (e.target.classList.contains('cantidad-input')) {
            const productoId = parseInt(e.target.dataset.id, 10);
            let nuevaCantidad = parseInt(e.target.value, 10);

            if (isNaN(nuevaCantidad) || nuevaCantidad < 1) {
                alert("Cantidad inválida.");
                onCarritoChange();
                return;
            }

            try {
                const producto = await GetByProductoId(productoId);
                const carrito = await CarritoAPI.get();
                const itemCarrito = carrito.find(p => p.id === productoId);

                if (!itemCarrito) {
                    alert("Producto no encontrado en el carrito.");
                    onCarritoChange();
                    return;
                }

                const cantidadActual = itemCarrito.quantity;
                const stockDisponible = producto.stock + cantidadActual;

                if (nuevaCantidad > stockDisponible) {
                    alert(`Solo hay ${stockDisponible} unidades disponibles.`);
                    nuevaCantidad = stockDisponible;
                    e.target.value = nuevaCantidad;
                }

                const nuevoStock = stockDisponible - nuevaCantidad;
                await UpdateProducto(productoId, { ...producto, stock: nuevoStock });

                await CarritoAPI.updateQuantity(productoId, nuevaCantidad);
                onCarritoChange();

            } catch (error) {
                console.error("Error al actualizar cantidad en el carrito:", error);
                alert("No se pudo actualizar la cantidad.");
            }
        }
    });

    // Vaciar carrito completo
    if (botonVaciar) {
        botonVaciar.addEventListener('click', async () => {
            if (confirm('¿Estás seguro que quieres vaciar el carrito?')) {
                try {
                    const carrito = await CarritoAPI.get();
                    for (const item of carrito) {
                        const producto = await GetByProductoId(item.id);
                        const nuevoStock = producto.stock + item.quantity;
                        await UpdateProducto(item.id, { ...producto, stock: nuevoStock });
                    }
                    await CarritoAPI.empty();
                    onCarritoChange();
                } catch (error) {
                    console.error("Error al vaciar el carrito:", error);
                    alert("No se pudo vaciar el carrito.");
                }
            }
        });
    }
}
