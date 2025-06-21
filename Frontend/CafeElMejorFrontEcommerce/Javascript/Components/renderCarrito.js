// =================================================================
// ARCHIVO 2: Components/RenderCarrito.js
// Responsabilidad: Crear el HTML de un producto en el carrito.
// =================================================================
export function crearCardProductoCarrito(producto) {
    const subtotal = producto.price * producto.quantity;
    const cardElement = document.createElement('div');
    cardElement.classList.add('producto-card-carrito');
    cardElement.dataset.productoId = producto.id;
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
