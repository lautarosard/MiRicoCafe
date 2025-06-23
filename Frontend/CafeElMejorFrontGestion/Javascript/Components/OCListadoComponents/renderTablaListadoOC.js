
import { abrirModalVerOrden } from './../../Handlers/LOCompraHandler/ConsultarOCompraHandler.js';
import { abrirModalEditarOrden } from './../../Handlers/LOCompraHandler/EditarOCompraHandler.js';
import { configurarModalEliminarOrden } from './../../Handlers/LOCompraHandler/EliminarOCompraHandler.js';


function formatearMoneda(numero) {
    if (typeof numero !== 'number') {
        return '$ 0,00';
    }
    return numero.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
}

export function crearFilaOrdenCompra(orden) {
    const fila = document.createElement('tr');

    // Usamos un template string para construir el HTML interno de la fila.
    // Asumimos que el objeto 'orden' tiene propiedades como: fechaRegistro, numeroOrden, proveedorNombre, y montoTotal.
    fila.innerHTML = `
        <td>${new Date(orden.fecha).toLocaleDateString('es-AR')}</td>
        <td>${orden.idOrdenDeCompra}</td>
        <td>${orden.proveedor.nombre}</td>
        <td>${formatearMoneda(orden.total)}</td>
        <td class="acciones">
            <button class="boton-accion-tabla ver">Ver</button>
            <button class="boton-accion-tabla editar">Editar</button>
            <button class="boton-accion-tabla eliminar">Eliminar</button>
        </td>
    `;

    // --- Asignación de Eventos a los Botones ---

    // 1. Botón "Ver"
    const botonVer = fila.querySelector('.boton-accion-tabla.ver');
    botonVer.addEventListener('click', () => {
        // Llama al handler correspondiente, pasándole toda la información de la orden.
        abrirModalVerOrden(orden);
    });

    // 2. Botón "Editar"
    const botonEditar = fila.querySelector('.boton-accion-tabla.editar');
    botonEditar.addEventListener('click', () => {
        // Llama al handler de edición.
        abrirModalEditarOrden(orden);
    });

    // 3. Botón "Eliminar"
    const botonEliminar = fila.querySelector('.boton-accion-tabla.eliminar');
    botonEliminar.addEventListener('click', () => {
        // Llama al handler de eliminación, pasándole la fila completa (para poder removerla) y los datos.
        configurarModalEliminarOrden(fila, orden);
    });

    return fila;
}