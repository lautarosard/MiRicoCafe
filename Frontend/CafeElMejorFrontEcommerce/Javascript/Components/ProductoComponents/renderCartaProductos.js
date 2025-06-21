const categoriaContenedores = new Map();

export function renderCartaProductoPorCategoria(producto) {
    const contenedorGeneral = document.getElementById('listProducts');
    if (!contenedorGeneral) return;

    let contenedorCategoria = categoriaContenedores.get(producto.categoria);

    if (!contenedorCategoria) {
        const titulo = document.createElement('h2');
        titulo.classList.add('productos-subtitulo');
        titulo.textContent = producto.categoria.toUpperCase();
        contenedorGeneral.appendChild(titulo);

        contenedorCategoria = document.createElement('div');
        contenedorCategoria.classList.add('contenedor-categoria');
        contenedorGeneral.appendChild(contenedorCategoria);

        categoriaContenedores.set(producto.categoria, contenedorCategoria);
    }

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

    contenedorCategoria.appendChild(card);
}
