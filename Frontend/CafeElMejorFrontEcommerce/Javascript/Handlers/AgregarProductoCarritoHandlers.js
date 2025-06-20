/**
 * Este handler gestiona la funcionalidad de agregar productos al carrito
 * desde la página de listado de productos.
 */
import CarritoAPI from '../APIs/CarritoApi.js';

/**
 * Configura el event listener en la lista de productos para capturar
 * los clics en los botones "Añadir al carrito".
 * @param {Function} alAgregarProductoCallback - Una función que se ejecuta después de agregar un producto (para actualizar la burbuja).
 */
export function configurarPaginaProductos(alAgregarProductoCallback) {
    const listProducts = document.querySelector('#listProducts');

    if (!listProducts) {
        // No estamos en la página de productos, así que no hacemos nada.
        return;
    }

    listProducts.addEventListener('click', async (e) => {
        if (e.target.classList.contains('btn-anadir-carrito')) {
            const productCard = e.target.closest('.producto-card');
            
            const quantityToAdd = parseInt(productCard.querySelector('input[type="number"]').value, 10);
            if (isNaN(quantityToAdd) || quantityToAdd <= 0) {
                alert('Por favor, ingresa una cantidad válida.');
                return;
            }

            const productoAAgregar = {
                image: productCard.querySelector('img').src,
                title: productCard.querySelector('h2').textContent,
                price: parseFloat(productCard.querySelector('.producto-precio').textContent.replace('$', '')),
                id: parseInt(e.target.dataset.id, 10),
                quantity: quantityToAdd
            };

            try {
                await CarritoAPI.add(productoAAgregar);
                alert(`Se añadieron ${productoAAgregar.quantity} x ${productoAAgregar.title} al carrito.`);
                
                // Si nos pasaron una función de callback, la ejecutamos.
                if (alAgregarProductoCallback) {
                    alAgregarProductoCallback();
                }
            } catch (error) {
                console.error("Error al agregar producto:", error);
                alert("No se pudo agregar el producto al carrito.");
            }
        }
    });
}
