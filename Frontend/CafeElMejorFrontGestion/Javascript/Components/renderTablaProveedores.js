export function crearFilaProveedor(proveedor) {
    const fila = document.createElement('tr');

    fila.innerHTML = `
        <td>${proveedor.idProveedor}</td>
        <td>${proveedor.nombre}</td>
        <td>${proveedor.email}</td>
        <td>${proveedor.telefono}</td>
        <td>${proveedor.cuit}</td>
        <td class="acciones-botones">
            <button class="boton-editar">Editar</button>
            <button class="boton-eliminar">Eliminar</button>
        </td>
    `;

    // Evento para botón Editar
    fila.querySelector('.boton-editar').addEventListener('click', () => {
        document.getElementById('editId').value = proveedor.idProveedor;
        document.getElementById('editNombre').value = proveedor.nombre;
        document.getElementById('editEmail').value = proveedor.email;
        document.getElementById('editTelefono').value = proveedor.telefono;
        document.getElementById('editCUIT').value = proveedor.cuit;
        document.getElementById('modalEditar').style.display = 'block';
    });

    // Evento para botón Eliminar
    fila.querySelector('.boton-eliminar').addEventListener('click', () => {
        document.getElementById('nombreProveedorEliminar').textContent = proveedor.nombre;
        document.getElementById('modalConfirmarEliminar').style.display = 'block';

        document.getElementById('botonConfirmarSi').onclick = async () => {
            try {
                const { DeleteProveedorId } = await import('../APIs/ProveedorApi.js');
                await DeleteProveedorId(proveedor.idProveedor);
                fila.remove();
                document.getElementById('modalConfirmarEliminar').style.display = 'none';
            } catch (error) {
                alert("Error al eliminar proveedor");
                console.error(error);
            }
        };

        document.getElementById('botonConfirmarCancelar').onclick = () => {
            document.getElementById('modalConfirmarEliminar').style.display = 'none';
        };
    });

    return fila;
}
