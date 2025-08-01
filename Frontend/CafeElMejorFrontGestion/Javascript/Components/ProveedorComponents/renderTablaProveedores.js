// crearFilaProveedor.js
import { abrirModalEditarProveedor } from './../../Handlers/ProveedorHandler/EditarProveedorHandler.js';
import { configurarModalEliminar } from './../../Handlers/ProveedorHandler/EliminarProveedorHandler.js';
import { configurarBusquedaProveedor } from './../../Handlers/ProveedorHandler/BuscarProveedoreHandler.js';


export function crearFilaProveedor(proveedor) {
    const fila = document.createElement('tr');

    fila.innerHTML = `
        <td>${proveedor.idProveedor}</td>
        <td>${proveedor.nombre}</td>
        <td>${proveedor.email}</td>
        <td>${proveedor.telefono}</td>
        <td>${proveedor.provincia}</td>
        <td>${proveedor.localidad}</td>
        <td>${proveedor.direccion}</td>
        <td>${proveedor.cuit}</td>
        <td class="acciones-botones">
            <button class="boton-editar">Editar</button>
            <button class="boton-eliminar">Eliminar</button>
        </td>
    `;

    /*
    // Asignar eventos
    fila.querySelector('.boton-editar').addEventListener('click', () => {
        configurarFormularioAgregar(proveedor);
    });
    */

    
    fila.querySelector('.boton-editar').addEventListener('click', () => {
        abrirModalEditarProveedor(proveedor);
    });

    fila.querySelector('.boton-eliminar').addEventListener('click', () => {
        configurarModalEliminar(fila, proveedor);
    });

    return fila;
}