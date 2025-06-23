// crearFilaProveedor.js
import { abrirModalEditarProducto } from '../../Handlers/ProductoHandler/EditarProductoHandler.js';
import { configurarModalEliminar } from '../../Handlers/ProductoHandler/EliminarProductoHandler.js';

export function crearFilaProducto(producto) {
    const fila = document.createElement('tr');

    fila.innerHTML = `
        <td>
            <div class="contenedor-imagen-cuadrada">
                <img src="${producto.imagenUrl}" alt="${producto.nombre}">
            </div>
        </td>
        <td>${producto.idProducto}</td>
        <td>${producto.nombre}</td>
        <td>${producto.categoria}</td>
        <td>${producto.descripcion}</td>
        <td>${producto.stock}</td>
        <td>${producto.precio}</td>
        <td class="acciones-botones">
            <button class="boton-editar">Editar</button>
            <button class="boton-eliminar">Eliminar</button>
        </td>
    `;

    // Asignar eventos
    fila.querySelector('.boton-editar').addEventListener('click', () => {
        configurarFormularioAgregar(producto); // <- ¿esto lo usás? Si no, lo podés borrar
    });

    fila.querySelector('.boton-editar').addEventListener('click', () => {
        abrirModalEditarProducto(producto);
    });

    fila.querySelector('.boton-eliminar').addEventListener('click', () => {
        configurarModalEliminar(fila, producto);
    });

    return fila;
}