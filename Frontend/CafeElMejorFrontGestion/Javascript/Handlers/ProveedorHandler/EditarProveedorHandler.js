// EditarProveedorHandler.js
import { UpdateProveedor } from '../../APIs/ProveedorApi.js';

export function configurarFormularioEditar() {
    const formEditar = document.getElementById("formEditar");
    const botonCancelar = document.getElementById('botonConfirmarCancelar');
    

    if (!formEditar) {
        console.error("No se encontró el formulario de edición");
        return;
    }

    formEditar.addEventListener("submit", async function (e) {
        e.preventDefault();

        const id = document.getElementById('editId').value;
        const proveedorActualizado = {
            nombre: document.getElementById('editNombre').value,
            email: document.getElementById('editEmail').value,
            telefono: document.getElementById('editTelefono').value,
            provincia: document.getElementById('editProvincia')?.value || "",
            localidad: document.getElementById('editLocalidad')?.value || "",
            direccion: document.getElementById('editDireccion')?.value || "",
            cuit: document.getElementById('editCUIT').value
        };

        try {
            await UpdateProveedor(id, proveedorActualizado);
            alert("Proveedor actualizado con éxito");
            document.getElementById("modalEditar").style.display = "none";
            location.reload();
        } catch (error) {
            alert("Error al actualizar proveedor");
            console.error(error);
        }
    });
}

export function abrirModalEditarProveedor(proveedor) {
    document.getElementById('editId').value = proveedor.idProveedor;
    document.getElementById('editNombre').value = proveedor.nombre;
    document.getElementById('editEmail').value = proveedor.email;
    document.getElementById('editTelefono').value = proveedor.telefono;
    document.getElementById('editProvincia').value = proveedor.provincia;
    document.getElementById('editLocalidad').value = proveedor.localidad;
    document.getElementById('editDireccion').value = proveedor.direccion;
    document.getElementById('editCUIT').value = proveedor.cuit;

    document.getElementById('modalEditar').style.display = 'block';
}
