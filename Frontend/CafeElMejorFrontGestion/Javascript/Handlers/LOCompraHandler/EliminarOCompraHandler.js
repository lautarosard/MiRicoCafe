import {DeleteOrdenDeCompraId as DeleteOrdenById} from './../../APIs/OCompraApi.js';

export function configurarModalEliminarOrden(fila, orden) {
    const modal = document.getElementById('modalConfirmarEliminar');
    const idSpan = document.getElementById('idOCEliminar');
    const botonSi = document.getElementById('botonConfirmarSi');
    const botonCancelar = document.getElementById('botonConfirmarCancelar');

    if (!modal || !idSpan || !botonSi || !botonCancelar) {
        console.error("No se encontraron los elementos del modal de confirmación de eliminación.");
        return;
    }

    // Personaliza el mensaje del modal.
    idSpan.textContent = orden.numeroOrden; // Muestra el número de orden.
    modal.style.display = 'flex';

    // Se usa '.onclick' para reemplazar cualquier listener anterior y evitar múltiples eliminaciones.
    botonSi.onclick = async () => {
        try {
            await DeleteOrdenById(orden.idOrden); // Llama a la API para eliminar.
            fila.remove(); // Elimina la fila del DOM si la API tuvo éxito.
            modal.style.display = 'none';
        } catch (error) {
            alert("Error al eliminar la orden de compra.");

            console.error(error);
        }
    };

    botonCancelar.onclick = () => {
        modal.style.display = 'none';
    };
}

