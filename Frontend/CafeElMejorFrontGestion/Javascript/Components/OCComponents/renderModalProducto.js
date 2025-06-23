export function crearFilaProductoEnModal(producto) {
    const fila = document.createElement('tr');

    fila.dataset.producto = JSON.stringify(producto);
    fila.innerHTML = `
        <td>${producto.idProducto}</td>
        <td>${producto.nombre}</td>
        <td>${producto.categoria}</td>
        <td>${producto.stock}</td>
        <td>$${producto.precio.toFixed(2)}</td>
        <td class="acciones">
            <button class="boton-agregar-item">Agregar</button>
        </td>
    `;
    return fila;
}