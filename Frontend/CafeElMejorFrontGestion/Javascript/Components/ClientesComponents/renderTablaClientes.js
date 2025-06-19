// crearFilaCliente.js
import { abrirModalEditarCliente } from '../Handlers/ClienteHandler/EditarClienteHandler.js';
import { configurarModalEliminar } from '../Handlers/ClienteHandler/EliminarClienteHandler.js';

export function crearFilaCliente(Cliente) {
    const fila = document.createElement('tr');

    fila.innerHTML = `
        <td>${Cliente.idCliente}</td>
        <td>${Cliente.nombre}</td>
        <td>${Cliente.email}</td>
        <td>${Cliente.Dni}</td>
        <td class="acciones-botones">
            <button class="boton-editar">Editar</button>
            <button class="boton-eliminar">Eliminar</button>
        </td>
    `;

    fila.querySelector('.boton-editar').addEventListener('click', () => {
        abrirModalEditarCliente(Cliente);
    });

    fila.querySelector('.boton-eliminar').addEventListener('click', () => {
        configurarModalEliminar(fila, Cliente);
    });

    return fila;
}
