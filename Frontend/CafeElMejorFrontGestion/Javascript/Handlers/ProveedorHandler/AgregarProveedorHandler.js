// Handlers/AgregarProveedorHandler.js
import { CreateProveedor } from '../../APIs/ProveedorApi.js';

export function configurarFormularioAgregar(cargarProveedores) {
    console.log("configurarFormularioAgregar cargado");

    const formAgregar = document.getElementById('formAgregar');

    if (!formAgregar) {
        console.error("No se encontró el formulario de agregar");
        return;
    }

    formAgregar.addEventListener('submit', async (e) => {
    e.preventDefault();
        
    const proveedor = {
        nombre: document.getElementById('addNombre').value,
        email: document.getElementById('addEmail').value,
        telefono: document.getElementById('addTelefono').value,
        provincia: document.getElementById('addProvincia').value,
        localidad: document.getElementById('addLocalidad').value,
        direccion: document.getElementById('addDireccion').value,
        cuit: document.getElementById('addCUIT').value,
    };

    try {
        await CreateProveedor(proveedor);
        alert("Proveedor agregado con éxito");
        document.getElementById("modalAgregar").style.display = "none";
        formAgregar.reset();
        cargarProveedores(); // Recargar lista
        } catch (error) {
        alert("Error al agregar proveedor");
        console.error(error);
        }
    });
}

export function configurarBotonNuevoProveedor() {
    console.log("Función configurarBotonNuevoProveedor iniciada.");

    const boton = document.getElementById('botonNuevoProveedor');
    const modal = document.getElementById('modalAgregar');

    // Pista para ver si encuentra los elementos en el HTML
    console.log("Elemento del botón encontrado:", boton);
    console.log("Elemento del modal encontrado:", modal);

    if (boton && modal) {
        // Si encontró ambos, intentará agregar el listener
        boton.addEventListener('click', () => {
            // Esta pista solo debe aparecer CUANDO HACES CLIC
            console.log("¡CLICK! Se ha presionado el botón 'Nuevo Proveedor'.");
            modal.style.display = 'flex';
        });
        console.log("¡Éxito! El addEventListener fue asignado al botón.");
    } else {
        // Si no encontró uno de los dos, nos lo dirá
        console.error("ERROR: No se pudo asignar el evento porque el botón o el modal no fueron encontrados en el HTML.");
    }
}

export function configurarBotonCancelarAgregar() {
    const botonCancelar = document.getElementById('botonCancelarAgregar');
    const modal = document.getElementById('modalAgregar');

    if (botonCancelar && modal) {
        botonCancelar.addEventListener('click', () => {
        modal.style.display = 'none';
        });
    }
}
