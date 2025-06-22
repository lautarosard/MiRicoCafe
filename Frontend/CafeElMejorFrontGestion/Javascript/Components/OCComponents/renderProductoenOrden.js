

// Formateador de moneda local.
const formatearMoneda = (numero) => {
    if (typeof numero !== 'number') return '$ 0,00';
    return numero.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
};


export function crearFilaProductoEnOrden(producto) {
    const fila = document.createElement('tr');
    // Guardamos el ID y el precio del producto en el dataset para encontrarlo y usarlo fácilmente después.
    fila.dataset.idProducto = producto.idProducto;
    fila.dataset.precioUnitario = producto.precio;

    const subtotal = producto.precio * producto.cantidad;

    fila.innerHTML = `
        <td>${producto.nombre}</td>
        <td>
            <input type="number" class="input-cantidad-modal" value="${producto.cantidad}" min="1">
        </td>
        <td>${formatearMoneda(producto.precio)}</td>
        <td class="subtotal-producto">${formatearMoneda(subtotal)}</td>
        <td class="acciones">
            <button class="boton-eliminar-item-modal" title="Quitar de la orden">🗑️</button>
        </td>
    `;

    return fila;
}
