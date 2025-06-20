import { DeleteClienteId } from '../../APIs/ClienteApi.js';

export function configurarModalEliminar(fila, Cliente) {
    const modal = document.getElementById('modalConfirmarEliminar');
    const nombreSpan = document.getElementById('nombreClienteEliminar');
    const botonSi = document.getElementById('botonConfirmarSi');
    const botonCancelar = document.getElementById('botonConfirmarCancelar');

    if (!modal || !nombreSpan || !botonSi || !botonCancelar) return;

    nombreSpan.textContent = Cliente.nombre;
    modal.style.display = 'block';

    botonSi.onclick = async () => {
        try {
            await DeleteClienteId(Cliente.idCliente);
            fila.remove();
            modal.style.display = 'none';
        } catch (error) {
            alert("Error al eliminar Cliente");
            console.error(error);
        }
    };

    botonCancelar.onclick = () => {
        modal.style.display = 'none';
    };
}