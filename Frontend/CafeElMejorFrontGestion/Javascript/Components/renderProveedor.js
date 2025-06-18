//renderProveedor, crear una tarjeta
import { DeleteProveedorId, GetByProveedorId, UpdateProveedor } from '../APIs/ProveedorApi.js';

export function crearTarjetaProveedor(Proveedor){
    const card = document.createElement('div');
    card.className = 'tarjeta-proveedor';

    card.innerHTML = 
    `
    <p>ID: ${Proveedor.idProveedor}</p>
    <h3>${Proveedor.nombre}</h3>
    <p>Email: ${Proveedor.email}</p>
    <p>telefono: ${Proveedor.telefono}</p>
    <p>provincia: ${Proveedor.provincia}</p>
    <p>localidad: ${Proveedor.localidad}</p>
    <p>direccion: ${Proveedor.direccion}</p>
    <p>cuit: ${Proveedor.cuit}</p>
    <button class="boton-eliminar">Eliminar</button>
    <button class="boton-editar">Editar</button>
    `;

    //-----------Boton Eliminar
    const botonEliminar = card.querySelector('.boton-eliminar');
    botonEliminar.addEventListener('click', async () => {
        const confirmacion = confirm(`¿Estás seguro de que querés eliminar a ${Proveedor.nombre}?`);
        if (!confirmacion) return;

        try {
            await DeleteProveedorId(Proveedor.idProveedor);
            card.remove(); // Elimina la tarjeta del DOM
        } catch (error) {
            alert('Error al eliminar el proveedor');
            console.error(error);
        }
    });


    //-----------Boton Editar
    const botonEditar = card.querySelector('.boton-editar');
    botonEditar.addEventListener('click', async () => {
        try {
            const proveedorCompleto = await GetByProveedorId(Proveedor.idProveedor);

            // Carga los datos al modal
            document.getElementById('editId').value = proveedorCompleto.idProveedor;
            document.getElementById('editNombre').value = proveedorCompleto.nombre;
            document.getElementById('editEmail').value = proveedorCompleto.email;
            document.getElementById('editTelefono').value = proveedorCompleto.telefono;
            document.getElementById('editProvincia').value = proveedorCompleto.provincia;
            document.getElementById('editLocalidad').value = proveedorCompleto.localidad;
            document.getElementById('editDireccion').value = proveedorCompleto.direccion;
            document.getElementById('editCUIT').value = proveedorCompleto.cuit;

            // Mostrar el modal
            document.getElementById('modalEditar').style.display = 'block';
        } catch (error) {
            alert('Error al obtener datos del proveedor');
            console.error(error);
        }
    });

    return card;
}