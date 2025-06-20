/**
 * Este componente se encarga de crear el elemento HTML
 * para un solo producto dentro de la "bolsa de compras".
 */

/**
 * Crea una tarjeta (card) HTML para un producto del carrito.
 * @param {object} producto - El objeto del producto con sus datos (id, title, price, quantity).
 * @returns {HTMLDivElement} Un elemento div que representa la tarjeta del producto.
 */
export function crearCardProductoCarrito(producto) {
    const subtotal = producto.price * producto.quantity;
    
    // Creamos el contenedor principal para la tarjeta del producto
    const cardElement = document.createElement('div');
    cardElement.classList.add('producto-card-carrito');
    
    // Asignamos un data-attribute con el ID del producto para facilitar su manejo futuro
    cardElement.dataset.productoId = producto.id;

    // Usamos innerHTML para construir la estructura interna de la tarjeta
    cardElement.innerHTML = `
        <div class="producto-info">
            <h3>${producto.title}</h3>
            <p>Precio unitario: $${producto.price.toFixed(2)}</p>
            <div class="producto-controles">
                <span>Cantidad:</span>
                <input type="number" value="${producto.quantity}" min="1" class="cantidad-input" data-id="${producto.id}">
            </div>
        </div>
        <div class="producto-precio-subtotal">
            $${subtotal.toFixed(2)}
        </div>
        <button class="btn-eliminar-producto" title="Eliminar Producto" data-id="${producto.id}">
            &times;
        </button>
    `;

    return cardElement;
}


