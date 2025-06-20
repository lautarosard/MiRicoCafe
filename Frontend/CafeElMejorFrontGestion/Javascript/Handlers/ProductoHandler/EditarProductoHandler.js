// EditarProveedorHandler.js
import { UpdateProducto } from '../../APIs/ProductoApi.js';

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
        const productoActualizado = {
            nombre: document.getElementById('editNombre').value,
            categoria: document.getElementById('editCategoria').value,
            descripcion: document.getElementById('editDescripcion').value,
            stock: document.getElementById('editStock').value,
            precio: document.getElementById('editPrecio').value
    };

        try {
            await UpdateProducto(id, productoActualizado);
            alert("Producto actualizado con éxito");
            document.getElementById("modalEditar").style.display = "none";
            location.reload();
        } catch (error) {
            alert("Error al actualizar producto");
            console.error(error);
        }
    });
}

export function abrirModalEditarProducto(producto) {
    document.getElementById('editId').value = producto.idProducto;
    document.getElementById('editNombre').value = producto.nombre;
    document.getElementById('editCategoria').value = producto.categoria;
    document.getElementById('editDescripcion').value = producto.descripcion;
    document.getElementById('editStock').value = producto.stock;
    document.getElementById('editPrecio').value = producto.precio;

    document.getElementById('modalEditar').style.display = 'flex';
}
// Funcion para cerrar el modal
export function configurarBotonCancelarEditar() {
    const botonCancelar = document.getElementById('botonCancelarEditar');
    const modal = document.getElementById('modalEditar');

    if (botonCancelar && modal) {
        botonCancelar.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
}