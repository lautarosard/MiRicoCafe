// Handlers/AgregarProductoHandler.js
import { CreateProducto } from '../../APIs/ProductoApi.js';

export function configurarFormularioAgregar(cargarProductos) {
    console.log("configurarFormularioAgregar cargado");

    const formAgregar = document.getElementById('formAgregar');

    if (!formAgregar) {
        console.error("No se encontró el formulario de agregar");
        return;
    }

    formAgregar.addEventListener('submit', async (e) => {
    e.preventDefault();
        
    const producto = {
        nombre: document.getElementById('addNombre').value,
        categoria: document.getElementById('addCategoria').value,
        descripcion: document.getElementById('addDescripcion').value,
        stock: document.getElementById('addStock').value,
        precio: document.getElementById('addPrecio').value
    };

    try {
        await CreateProducto(producto);
        alert("Producto agregado con éxito");
        document.getElementById("modalAgregar").style.display = "none";
        formAgregar.reset();
        cargarProductos(); // Recargar lista
        } catch (error) {
        alert("Error al agregar producto");
        console.error(error);
        }
    });
}

export function configurarBotonNuevoProducto() {
    console.log("Función configurarBotonNuevoProducto iniciada.");

    const boton = document.getElementById('botonNuevoProducto');
    const modal = document.getElementById('modalAgregar');

    // Pista para ver si encuentra los elementos en el HTML
    console.log("Elemento del botón encontrado:", boton);
    console.log("Elemento del modal encontrado:", modal);

    if (boton && modal) {
        // Si encontró ambos, intentará agregar el listener
        boton.addEventListener('click', () => {
            // Esta pista solo debe aparecer CUANDO HACES CLIC
            console.log("¡CLICK! Se ha presionado el botón 'Nuevo Producto'.");
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
