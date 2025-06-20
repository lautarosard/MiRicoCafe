// =================================================================
// ARCHIVO 3: Handlers/AgregarProductoHandler.js
// Responsabilidad: Manejar el clic de "Añadir al carrito".
// =================================================================
import CarritoAPI from './../APIs/Carrito.js';

export function configurarPaginaProductos(alAgregarProductoCallback) {
    const listProducts = document.querySelector('#listProducts');
    if (!listProducts) return;

    listProducts.addEventListener('click', async (e) => {
        if (e.target.classList.contains('btn-anadir-carrito')) {
            try {
                const productCard = e.target.closest('.producto-card');

                if (!productCard) {
                    console.error("Error de lógica: no se encontró el elemento padre '.producto-card'.", e.target);
                    throw new Error("Estructura HTML del producto incorrecta.");
                }

                // Búsqueda robusta de cada elemento dentro de la tarjeta
                const titleElement = productCard.querySelector('h2.producto-nombre');
                const priceElement = productCard.querySelector('.producto-precio');
                const imageElement = productCard.querySelector('img');
                const quantityInput = productCard.querySelector('input[type="number"]');

                if (!titleElement || !priceElement || !imageElement || !quantityInput) {
                    console.error("Error de HTML: Falta un elemento esencial dentro de la tarjeta del producto.", {
                        title: titleElement,
                        price: priceElement,
                        image: imageElement,
                        input: quantityInput
                    });
                    throw new Error("Faltan datos en la tarjeta del producto.");
                }

                const quantityToAdd = parseInt(quantityInput.value, 10);
                if (isNaN(quantityToAdd) || quantityToAdd <= 0) {
                    alert('Por favor, ingresa una cantidad válida.');
                    return;
                }

                const productoAAgregar = {
                    image: imageElement.src,
                    title: titleElement.textContent,
                    price: parseFloat(priceElement.textContent.replace('$', '')),
                    id: parseInt(e.target.dataset.id, 10),
                    quantity: quantityToAdd
                };

                await CarritoAPI.add(productoAAgregar);
                alert(`Se añadieron ${productoAAgregar.quantity} x ${productoAAgregar.title} al carrito.`);
                
                if (alAgregarProductoCallback) {
                    alAgregarProductoCallback();
                }

            } catch (error) {
                console.error("Error detallado al agregar producto:", error);
                alert("No se pudo agregar el producto. Revisa la consola para más detalles.");
            }
        }
    });
}
