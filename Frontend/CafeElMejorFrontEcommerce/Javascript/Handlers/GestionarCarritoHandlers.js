/**
 * Este handler gestiona todas las interacciones dentro de la página del carrito:
 * - Actualizar cantidad
 * - Eliminar un producto
 * - Vaciar el carrito
 */
import CarritoAPI from '../APIs/CarritoApi.js';

/**
 * Configura los event listeners para la página del carrito.
 * @param {Function} onCarritoChange - Callback que se ejecuta cada vez que el carrito cambia, para poder re-renderizar la vista.
 */
export function configurarPaginaCarrito(onCarritoChange) {
    const contenedorProductos = document.querySelector('#contenedor-productos-carrito');
    const botonVaciar = document.querySelector('#emptyCart');

    if (!contenedorProductos) {
        // No estamos en la página del carrito, no hacemos nada.
        return;
    }

    // Usamos delegación de eventos para manejar clics y cambios dentro del contenedor.
    contenedorProductos.addEventListener('click', async (e) => {
        // --- Eliminar un producto ---
        if (e.target.classList.contains('btn-eliminar-producto')) {
            const productoId = parseInt(e.target.dataset.id, 10);
            try {
                await CarritoAPI.remove(productoId);
                onCarritoChange(); // Llama al callback para actualizar la vista
            } catch (error) {
                console.error("Error al eliminar producto:", error);
                alert("No se pudo eliminar el producto.");
            }
        }
    });

    contenedorProductos.addEventListener('change', async (e) => {
        // --- Actualizar cantidad de un producto ---
        if (e.target.classList.contains('cantidad-input')) {
            const productoId = parseInt(e.target.dataset.id, 10);
            const nuevaCantidad = parseInt(e.target.value, 10);
            try {
                await CarritoAPI.updateQuantity(productoId, nuevaCantidad);
                onCarritoChange(); // Llama al callback para actualizar la vista
            } catch (error) {
                console.error("Error al actualizar la cantidad:", error);
                alert("No se pudo actualizar la cantidad del producto.");
            }
        }
    });

    // --- Vaciar todo el carrito ---
    if (botonVaciar) {
        botonVaciar.addEventListener('click', async () => {
            if (confirm('¿Estás seguro de que quieres vaciar todo el carrito?')) {
                try {
                    await CarritoAPI.empty();
                    onCarritoChange(); // Llama al callback para actualizar la vista
                } catch (error) {
                    console.error("Error al vaciar el carrito:", error);
                    alert("No se pudo vaciar el carrito.");
                }
            }
        });
    }
}
