import { UpdateCliente } from '../../APIs/ClienteApi.js';

export function configurarFormularioEditarCliente() {
    const formEditar = document.getElementById("formEditar");

    if (!formEditar) {
        console.error("No se encontró el formulario de edición");
        return;
    }

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
            document.getElementById("modalEditarCliente").style.display = "none";
            location.reload();
        } catch (error) {
            alert("Error al actualizar Cliente");
            console.error(error);
        }
    });
}

export function abrirModalEditarCliente(Cliente) {
    document.getElementById('editId').value = Cliente.idCliente;
    document.getElementById('editNombre').value = Cliente.nombre;
    document.getElementById('editEmail').value = Cliente.email;
    document.getElementById('editDNI').value = Cliente.dni;

    document.getElementById('modalEditarCliente').style.display = 'block';
}
