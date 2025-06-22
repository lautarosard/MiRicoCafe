import { GetAll as GetAllProductos, CreateProducto } from './../APIs/ProductoApi.js';
import { crearFilaProducto } from './../Components/ProductoComponents/renderTablaProductos.js';
import { configurarFormularioEditar, configurarBotonCancelarEditar } from './../Handlers/ProductoHandler/EditarProductoHandler.js';
import { 
    configurarBotonNuevoProducto, 
    configurarFormularioAgregar,
    configurarBotonCancelarAgregar
} from './../Handlers/ProductoHandler/AgregarProductoHandler.js';
import { configurarBusquedaProducto } from './../Handlers/ProductoHandler/BuscarProductoHandler.js';

async function cargarProductos() {
    try {
        const cuerpoTabla = document.querySelector('.tabla-productos tbody');
        cuerpoTabla.innerHTML = ''; // Limpiar tabla

        const productos = await GetAllProductos();
        console.log("Productos:", productos);
        if (productos.length === 0) {
            const filaVacia = document.createElement('tr');
            filaVacia.innerHTML = '<td colspan="6">No hay productos disponibles</td>';
            cuerpoTabla.appendChild(filaVacia);
            return;
        }

        const fragment = document.createDocumentFragment();
        productos.forEach(producto => {
            const fila = crearFilaProducto(producto);
            fragment.appendChild(fila);
        });

        cuerpoTabla.appendChild(fragment);

    } catch (error) {
        console.error('Error en cargarProductos:', error);

        const cuerpoTabla = document.querySelector('.tabla-productos tbody');
        const filaError = document.createElement('tr');
        filaError.innerHTML = '<td colspan="6">Error al cargar los productos</td>';
        cuerpoTabla.appendChild(filaError);
    }
}

function configurarFormularioCreacion() {
    const form = document.getElementById('form-producto');
    const mensaje = document.getElementById('mensaje');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const proveedor = {
            nombre: document.getElementById('addNombre').value,
            categoria: document.getElementById('addCategoria').value,
            descripcion: document.getElementById('addDescripcion').value,
            stock: document.getElementById('addStock').value,
            precio: document.getElementById('addPrecio').value
        };

        try {
            const creado = await CreateProducto(producto);
            mensaje.textContent = `Producto creado con ID: ${creado.idProducto}`;
            form.reset();
            cargarProductos(); // recargar lista
        } catch (error) {
            mensaje.textContent = "Error al crear producto.";
            console.error(error);
        }
    });
}

export function iniciarPaginaProductos() {

     // 1. Carga la lista inicial de proveedores
    cargarProductos();
    // 2. Configura los botones y formularios para la funcionalidad de "Agregar"
    configurarBotonNuevoProducto();

    // Le pasamos 'cargarProveedores' para que pueda recargar la lista despuÃ©s de agregar.
    configurarFormularioAgregar(cargarProductos); 
    configurarBotonCancelarAgregar();

    // Configurar formularios
    configurarFormularioEditar();
    configurarFormularioCreacion();
    configurarBotonCancelarEditar();

    
    //boton buscar 
    configurarBusquedaProducto();
}