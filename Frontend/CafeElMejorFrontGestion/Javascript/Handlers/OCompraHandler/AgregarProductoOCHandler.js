
// Asumimos que tienes una API de productos.
import { GetAll as GetAllProductos } from './../../APIs/ProductoApi.js'; 
import { crearFilaProductoEnModal } from '../../Components/OCComponents/renderModalProducto.js';

// Guardamos una copia de todos los productos para no llamar a la API cada vez que se busca.
let todosLosProductos = [];

/**
 * Carga todos los productos en la tabla del modal.
 */
async function cargarProductosEnModal() {
    const cuerpoTablaModal = document.getElementById('cuerpo-tabla-productos-modal');
    if (!cuerpoTablaModal) return;

    cuerpoTablaModal.innerHTML = '<tr><td colspan="6">Cargando...</td></tr>';
    
    try {
        todosLosProductos = await GetAllProductos();
        renderizarTablaModal(todosLosProductos);
    } catch (error) {
        console.error("Error al cargar productos en el modal:", error);
        cuerpoTablaModal.innerHTML = '<tr><td colspan="6" style="color:red;">Error al cargar productos.</td></tr>';
    }
}


function renderizarTablaModal(productos) {
    const cuerpoTablaModal = document.getElementById('cuerpo-tabla-productos-modal');
    cuerpoTablaModal.innerHTML = '';
    
    if (productos.length === 0) {
        cuerpoTablaModal.innerHTML = '<tr><td colspan="6">No se encontraron productos.</td></tr>';
        return;
    }

    const fragment = document.createDocumentFragment();
    productos.forEach(producto => {
        const fila = crearFilaProductoEnModal(producto);
        fragment.appendChild(fila);
    });
    cuerpoTablaModal.appendChild(fragment);
}

/**
 * Configura el botón "+ Nuevo Producto" para abrir el modal.
 */
export function configurarBotonAbrirModalProductos() {
    const botonAbrir = document.getElementById('btn-abrir-modal-productos');
    const modal = document.getElementById('modal-seleccionar-producto');

    if (botonAbrir && modal) {
        botonAbrir.addEventListener('click', () => {
            modal.style.display = 'flex';
            // Cargamos los productos solo la primera vez que se abre el modal, o si queremos refrescar.
            if (todosLosProductos.length === 0) {
                cargarProductosEnModal();
            }
        });
    }
}

/**
 * Configura la funcionalidad de búsqueda dentro del modal.
 */
export function configurarBusquedaEnModal() {
    const inputBusqueda = document.getElementById('buscar-producto-modal');
    if (!inputBusqueda) return;

    inputBusqueda.addEventListener('keyup', () => {
        const termino = inputBusqueda.value.toLowerCase().trim();
        const productosFiltrados = todosLosProductos.filter(p => 
            p.nombre.toLowerCase().includes(termino) ||
            p.idProducto.toString().includes(termino)
        );
        renderizarTablaModal(productosFiltrados);
    });
}


export function configurarAgregarProductoDesdeModal(agregarProductoCallback) {
    const tablaModal = document.getElementById('cuerpo-tabla-productos-modal');
    if (!tablaModal) return;

    tablaModal.addEventListener('click', (e) => {
        if (e.target.classList.contains('boton-agregar-item')) {
            const fila = e.target.closest('tr');
            // Recuperamos el objeto completo del producto que guardamos en el dataset.
            const productoSeleccionado = JSON.parse(fila.dataset.producto);
            
            // Le añadimos una cantidad inicial de 1.
            productoSeleccionado.cantidad = 1;

            agregarProductoCallback(productoSeleccionado);
        }
    });
}

/**
 * Configura el botón de cierre del modal.
 */
export function configurarCierreModalProductos() {
    const botonCerrar = document.getElementById('cerrar-modal-productos');
    const modal = document.getElementById('modal-seleccionar-producto');
    
    if (botonCerrar && modal) {
        botonCerrar.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
}