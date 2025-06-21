import { UpdateCliente } from '../../APIs/ClienteApi.js';

export function configurarFormularioEditarCliente() {
    const formEditar = document.getElementById("formEditar");
    const botonCancelar = document.getElementById('botonConfirmarCancelar');
    const modal = document.getElementById("modalEditarCliente"); // Aseguramos que esté definido

    if (!formEditar || !botonCancelar || !modal) {
        console.error("Faltan elementos en el DOM para el formulario de edición");
        return;
    }

    // Submit del formulario
    formEditar.addEventListener("submit", async function (e) {
        e.preventDefault();

        const id = document.getElementById('editId').value;
        const ClienteActualizado = {
            nombre: document.getElementById('editNombre').value,
            email: document.getElementById('editEmail').value,
            dni: document.getElementById('editDNI').value,
        };

        try {
            await UpdateCliente(id, ClienteActualizado);
            alert("Cliente actualizado con éxito");
            modal.style.display = "none";
            location.reload();
        } catch (error) {
            alert("Error al actualizar Cliente");
            console.error(error);
        }
    });

    // Cierre del modal con botón "Cancelar"
    botonCancelar.addEventListener("click", () => {
        modal.style.display = "none";
    });
}

export function abrirModalEditarCliente(Cliente) {
    document.getElementById('editId').value = Cliente.idCliente;
    document.getElementById('editNombre').value = Cliente.nombre;
    document.getElementById('editEmail').value = Cliente.email;
    document.getElementById('editDNI').value = Cliente.dni;

    document.getElementById('modalEditarCliente').style.display = 'flex';
}


