// EliminarProductoHandler.js
import { DeleteProductoId } from '../../APIs/ProductoApi.js';

export function configurarModalEliminar(fila, producto) {
    const modal = document.getElementById('modalConfirmarEliminar');
    const nombreSpan = document.getElementById('nombreProductoEliminar');
    const botonSi = document.getElementById('botonConfirmarSi');
    const botonCancelar = document.getElementById('botonConfirmarCancelar');

    if (!modal || !nombreSpan || !botonSi || !botonCancelar) return;

    nombreSpan.textContent = producto.nombre;
    modal.style.display = 'flex';

    botonSi.onclick = async () => {
        try {
            await DeleteProductoId(producto.idProducto);
            fila.remove();
            modal.style.display = 'none';
        } catch (error) {
            alert("Error al eliminar producto");
            console.error(error);
        }
    };

    botonCancelar.onclick = () => {
        modal.style.display = 'none';
    };
}
