
import { ObtenerCarrito, ActualizarCantidadEnCarrito, EliminarItemDelCarrito, VaciarCarrito } from './../APIs/Carrito.js';
import { GetByProductoId, UpdateProducto } from './../APIs/ProductoApi.js';

const CLIENTE_ID_TEMPORAL = 1;


export function configurarPaginaCarrito(onCarritoChange) {
    const contenedorProductos = document.querySelector('#contenedor-productos-carrito');
    const botonVaciar = document.querySelector('#emptyCart');
    if (!contenedorProductos) return;

    contenedorProductos.addEventListener('click', async (e) => {
        if (e.target.classList.contains('btn-eliminar-producto')) {
            const productoId = parseInt(e.target.dataset.id, 10);

            try {
                const producto = await GetByProductoId(productoId);
                const carrito = await ObtenerCarrito(CLIENTE_ID_TEMPORAL);
                const item = carrito.find(p => p.id === productoId);

                if (item) {
                    const nuevoStock = producto.stock + item.cantidad;
                    await UpdateProducto(productoId, { ...producto, stock: nuevoStock });
                }

                await EliminarItemDelCarrito(CLIENTE_ID_TEMPORAL, productoId);
                onCarritoChange();
            } catch (error) {
                console.error("Error al eliminar producto:", error);
            }

        }
    });

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
                const carrito = await ObtenerCarrito(CLIENTE_ID_TEMPORAL);
                const item = carrito.find(p => p.id === productoId);

                if (!item) return;

                const cantidadActual = item.cantidad;
                const stockDisponible = producto.stock + cantidadActual;

                if (nuevaCantidad > stockDisponible) {
                    alert(`Solo hay ${stockDisponible} unidades disponibles.`);
                    nuevaCantidad = stockDisponible;
                    e.target.value = nuevaCantidad;
                }

                const nuevoStock = stockDisponible - nuevaCantidad;
                await UpdateProducto(productoId, { ...producto, stock: nuevoStock });

                await ActualizarCantidadEnCarrito(CLIENTE_ID_TEMPORAL, productoId, nuevaCantidad);
                onCarritoChange();
            } catch (error) {
                console.error("Error al actualizar cantidad:", error);
            }

        }
    });

    if (botonVaciar) {
        botonVaciar.addEventListener('click', async () => {

            if (!confirm('¿Vaciar el carrito?')) return;

            try {
                const carrito = await ObtenerCarrito(CLIENTE_ID_TEMPORAL);
                for (const item of carrito) {
                    const producto = await GetByProductoId(item.id);
                    const nuevoStock = producto.stock + item.cantidad;
                    await UpdateProducto(item.id, { ...producto, stock: nuevoStock });
                }
                await VaciarCarrito(CLIENTE_ID_TEMPORAL);
                onCarritoChange();
            } catch (error) {
                console.error("Error al vaciar carrito:", error);

            }
        });
    }
}