// crearFilaProveedor.js
import { abrirModalEditarProducto } from '../../Handlers/ProductoHandler/EditarProductoHandler.js';
import { configurarModalEliminar } from '../../Handlers/ProductoHandler/EliminarProductoHandler.js';


export function crearFilaOC(OrdenDeCompra) {
    const fila = document.createElement('tr');

    fila.innerHTML = `
        <td></td>
        <td>${OrdenDeCompra.fecha}</td>
        <td>${OrdenDeCompra.idOrdenDeCompra}</td>
        <td>${OrdenDeCompra.proveedor}</td>
        <td>${OrdenDeCompra.total}</td>
        <td class="acciones-botones">
            <button class="boton-ver">Ver</button>
            <button class="boton-editar">Editar</button>
            <button class="boton-eliminar">Eliminar</button>
        </td>
    `;

    // Asignar eventos
    fila.querySelector('.boton-editar').addEventListener('click', () => {
        configurarFormularioAgregar(OrdenDeCompra);
    });
    
    fila.querySelector('.boton-editar').addEventListener('click', () => {
        abrirModalEditarProducto(OrdenDeCompra);
    });

    fila.querySelector('.boton-eliminar').addEventListener('click', () => {
        configurarModalEliminar(fila, OrdenDeCompra);
    });

    return fila;
}