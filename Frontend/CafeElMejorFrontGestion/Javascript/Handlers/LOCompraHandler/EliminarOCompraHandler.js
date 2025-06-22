import { DeleteOrdenDeCompraId } from '../../APIs/OCompraApi.js';

export function configurarModalEliminar(fila, OrdenDeCompra) {
    const modal = document.getElementById('modalConfirmarEliminar');
    const nombreSpan = document.getElementById('nombreOrdenDeCompraEliminar');
    const botonSi = document.getElementById('botonConfirmarSi');
    const botonCancelar = document.getElementById('botonConfirmarCancelar'); // ← corregido

    if (!modal || !nombreSpan || !botonSi || !botonCancelar) return;

    nombreSpan.textContent = OrdenDeCompra.idOrdenDeCompra;
    modal.style.display = 'flex';

    botonSi.onclick = async () => {
        try {
            await DeleteOrdenDeCompraId(OrdenDeCompra.idOrdenDeCompra);
            fila.remove();
            modal.style.display = 'none';
        } catch (error) {
            alert("Error al eliminar OrdenDeCompra");
            console.error(error);
        }
    };

    botonCancelar.onclick = () => {
        modal.style.display = 'none';
    };
}

export function configurarBotonCancelarEditar() {
    const botonCancelar = document.getElementById('botonCancelarEditar');
    const modal = document.getElementById('modalEditar');

    if (botonCancelar && modal) {
        botonCancelar.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
}