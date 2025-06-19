import { DeleteClienteId, GetByClienteId, UpdateCliente } from '../APIs/ClienteApi.js';

export function crearTarjetaCliente(Cliente){
    const card = document.createElement('div');
    card.className = 'tarjeta-Cliente';

    card.innerHTML = 
    `
    <p>ID: ${Cliente.idCliente}</p>
    <h3>${Cliente.nombre}</h3>
    <p>Email: ${Cliente.email}</p>
    <p>cuit: ${Cliente.Dni}</p>
    <button class="boton-eliminar">Eliminar</button>
    <button class="boton-editar">Editar</button>
    `;

    //-----------Boton Eliminar
    const botonEliminar = card.querySelector('.boton-eliminar');
    botonEliminar.addEventListener('click', async () => {
        const confirmacion = confirm(`¿Estás seguro de que querés eliminar a ${Cliente.nombre}?`);
        if (!confirmacion) return;

        try {
            await DeleteClienteId(Cliente.idCliente);
            card.remove(); // Elimina la tarjeta del DOM
        } catch (error) {
            alert('Error al eliminar el Cliente');
            console.error(error);
        }
    });


    //-----------Boton Editar
    const botonEditar = card.querySelector('.boton-editar');
    botonEditar.addEventListener('click', async () => {
        try {
            const ClienteCompleto = await GetByClienteId(Cliente.idCliente);

            // Carga los datos al modal
            document.getElementById('editId').value = ClienteCompleto.idCliente;
            document.getElementById('editNombre').value = ClienteCompleto.nombre;
            document.getElementById('editEmail').value = ClienteCompleto.email;
            document.getElementById('editDNI').value = ClienteCompleto.Dni;
            // Mostrar el modal
            document.getElementById('modalEditar').style.display = 'block';
        } catch (error) {
            alert('Error al obtener datos del Cliente');
            console.error(error);
        }
    });

    return card;
}