// EliminarProveedorHandler.js
import { DeleteProveedorId } from '../../APIs/ProveedorApi.js';

export function configurarModalEliminar(fila, proveedor) {
    const modal = document.getElementById('modalConfirmarEliminar');
    const nombreSpan = document.getElementById('nombreProveedorEliminar');
    const botonSi = document.getElementById('botonConfirmarSi');
    const botonCancelar = document.getElementById('botonConfirmarCancelar');

    if (!modal || !nombreSpan || !botonSi || !botonCancelar) return;

    nombreSpan.textContent = proveedor.nombre;
    modal.style.display = 'flex';

    botonSi.onclick = async () => {
        try {
            await DeleteProveedorId(proveedor.idProveedor);
            fila.remove();
            modal.style.display = 'none';
        } catch (error) {
            alert("Error al eliminar proveedor");
            console.error(error);
        }
    };

    botonCancelar.onclick = () => {
        modal.style.display = 'none';
    };
}
