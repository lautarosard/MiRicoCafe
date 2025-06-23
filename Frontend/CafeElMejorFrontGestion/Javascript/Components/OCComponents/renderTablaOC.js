export function crearFilaProductoEnOrden(producto) {
    const fila = document.createElement('tr');
    // Guardamos el ID y el precio en el dataset para usarlos en cálculos posteriores.
    fila.dataset.idProducto = producto.idProducto;
    fila.dataset.precioUnitario = producto.precio;

    const subtotal = (producto.precio * producto.cantidad).toFixed(2);

    fila.innerHTML = `
        <td>${producto.nombre}</td>
        <td>
            <input type="number" class="input-cantidad" value="${producto.cantidad}" min="1">
        </td>
        <td>$${producto.precio.toFixed(2)}</td>
        <td class="subtotal-producto">$${subtotal}</td>
        <td class="acciones">
            <button class="boton-eliminar-item" title="Eliminar Producto">🗑️</button>
        </td>
    `;
    return fila;
}

