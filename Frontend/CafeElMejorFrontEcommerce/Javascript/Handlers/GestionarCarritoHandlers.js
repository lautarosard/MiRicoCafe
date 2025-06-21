// =================================================================
// ARCHIVO 4: Handlers/GestionarCarritoHandler.js
// Responsabilidad: Manejar acciones dentro de la página del carrito.
// =================================================================
 import CarritoAPI from './../APIs/Carrito.js'; // Ya importado en el archivo principal
export function configurarPaginaCarrito(onCarritoChange) {
    const contenedorProductos = document.querySelector('#contenedor-productos-carrito');
    const botonVaciar = document.querySelector('#emptyCart');
    if (!contenedorProductos) return;

    contenedorProductos.addEventListener('click', async (e) => {
        if (e.target.classList.contains('btn-eliminar-producto')) {
            const productoId = parseInt(e.target.dataset.id, 10);
            await CarritoAPI.remove(productoId);
            onCarritoChange();
        }
    });

    contenedorProductos.addEventListener('change', async (e) => {
        if (e.target.classList.contains('cantidad-input')) {
            const productoId = parseInt(e.target.dataset.id, 10);
            const nuevaCantidad = parseInt(e.target.value, 10);
            await CarritoAPI.updateQuantity(productoId, nuevaCantidad);
            onCarritoChange();
        }
    });

    if (botonVaciar) {
        botonVaciar.addEventListener('click', async () => {
            if (confirm('¿Estás seguro?')) {
                await CarritoAPI.empty();
                onCarritoChange();
            }
        });
    }
}
