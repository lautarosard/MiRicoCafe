export function renderCartaProductoPorCategoria(producto) {
    const card = document.createElement('article');
    card.classList.add('producto-card');

    card.innerHTML = `
        <h2 class="producto-nombre">${producto.nombre.toUpperCase()}</h2>
        <p class="producto-precio">$${producto.precio}</p>
        <p class="producto-stock">Stock disponible: ${producto.stock}</p>
        <div class="producto-cantidad">
            <input type="number" value="1" min="1" max="${producto.stock}" aria-label="Cantidad">
        </div>
        <button class="btn-anadir-carrito" data-id="${producto.idProducto}">AÑADIR AL CARRITO</button>
    `;

    return card;  // <-- Devuelvo el nodo creado
}