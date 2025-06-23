
// --- 1. IMPORTACIONES DE MÓDULOS ---
// Handlers para la lógica de proveedores en la página.
import {
    cargarProveedoresEnSelector,
    configurarFechaMinima
} from './../Handlers/OCompraHandler/AgregarProvedorOCHandler.js';

// Handlers para la lógica del modal de selección de productos.
import {
    configurarBotonAbrirModalProductos,
    configurarCierreModalProductos,
    configurarBusquedaEnModal,
    configurarAgregarProductoDesdeModal
} from './../Handlers/OCompraHandler/AgregarProductoOCHandler.js';

// Handlers para la lógica de la tabla principal de la orden y el registro final.
import {
    agregarProductoAOrden,
    configurarTablaPrincipal,
    configurarBotonRegistrar
} from './../Handlers/OCompraHandler/AgregarOCompraHandler.js';


// --- 2. FUNCIÓN DE INICIALIZACIÓN DE LA PÁGINA ---
export function iniciarPaginaNuevaOrden() {
    
    // Configura la lógica inicial del formulario principal (proveedores y fecha).
    configurarFechaMinima();
    cargarProveedoresEnSelector();

    // Configura toda la interactividad del modal para seleccionar productos.
    // Le pasamos 'agregarProductoAOrden' como la acción a realizar cuando se selecciona un producto.
    configurarBotonAbrirModalProductos();
    configurarCierreModalProductos();
    configurarBusquedaEnModal();
    configurarAgregarProductoDesdeModal(agregarProductoAOrden);

    // Configura la interactividad de la tabla principal de la orden (cambiar cantidad, eliminar).
    configurarTablaPrincipal();

    // Configura el botón final para registrar la orden de compra.
    configurarBotonRegistrar();

    console.log("Página de Nueva Orden de Compra inicializada correctamente.");
}

