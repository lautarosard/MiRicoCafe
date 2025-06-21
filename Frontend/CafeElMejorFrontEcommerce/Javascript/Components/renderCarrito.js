// =================================================================
// ARCHIVO 2: Components/RenderCarrito.js
// Responsabilidad: Crear el HTML de un producto en el carrito.
// =================================================================

export function crearCardProductoCarrito(producto) {
    const price = parseFloat(producto.precio);
    const quantity = parseInt(producto.cantidad);
    const subtotal = (isNaN(price) || isNaN(quantity)) ? 0 : price * quantity;

    const cardElement = document.createElement('div');
    cardElement.classList.add('producto-card-carrito');
    cardElement.dataset.productoId = producto.id;

    cardElement.innerHTML = ` 
        <div class="producto-info">
            <h3>${producto.nombre}</h3>
            <p>Precio unitario: $${isNaN(price) ? '0.00' : price.toFixed(2)}</p>
            <div class="producto-controles">
                <span>Cantidad:</span>
                <input 
                    type="number" 
                    value="${isNaN(quantity) ? 1 : quantity}" 
                    min="1" 
                    class="cantidad-input" 
                    data-id="${producto.id}"
                >
            </div>
        </div>
        <div class="producto-precio-subtotal">
            $${subtotal.toFixed(2)}
        </div>
        <button 
            class="btn-eliminar-producto" 
            title="Eliminar Producto" 
            data-id="${producto.id}"
        >
            &times;
        </button>
    `;

    return cardElement;
}