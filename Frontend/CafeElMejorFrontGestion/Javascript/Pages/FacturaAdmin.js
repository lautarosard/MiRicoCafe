/**
 * Este archivo es el punto de entrada de la lógica para la página de facturas.
 * Se encarga de orquestar la carga de datos y la configuración de eventos.
 */

// --- 1. IMPORTACIONES DE MÓDULOS ---
// API: Para obtener los datos.
import { GetAllFacturas } from '../APIs/FacturaApi.js';

// Components: Para crear los elementos HTML.
import { crearFilaFactura } from '../Components/crearFilaFactura.js';

// Handlers: Para manejar la interactividad del usuario.
import { configurarBotonNuevaFactura, configurarFormularioAgregar, configurarCierreModalAgregar } from '../Handlers/AgregarFacturaHandler.js';
import { configurarCierreModalVer } from '../Handlers/ConsultarFacturaHandler.js';
import { configurarBusquedaFacturas } from '../Handlers/BuscarFacturaHandler.js';


// --- 2. FUNCIÓN PRINCIPAL DE RENDERIZADO ---

/**
 * Obtiene las facturas desde la API y las muestra en la tabla.
 * Esta función es el corazón de la visualización de datos.
 * @param {Array<object>} [facturas] - Un array opcional de facturas ya filtradas para mostrar. Si no se provee, las busca desde la API.
 */
async function renderizarFacturasEnTabla(facturas) {
    const tablaBody = document.querySelector('.tabla-facturas tbody');
    if (!tablaBody) {
        console.error("No se encontró el cuerpo de la tabla de facturas.");
        return;
    }

    try {
        // Si no nos pasan un array de facturas (por ej, de una búsqueda), las vamos a buscar a la API.
        const facturasParaMostrar = facturas || await GetAllFacturas();
        
        tablaBody.innerHTML = ''; // Limpiar la tabla antes de agregar las nuevas filas.

        if (facturasParaMostrar.length === 0) {
            tablaBody.innerHTML = '<tr><td colspan="8">No hay facturas para mostrar.</td></tr>';
            return;
        }

        // Usamos un DocumentFragment para mejorar el rendimiento al añadir muchas filas.
        const fragment = document.createDocumentFragment();
        facturasParaMostrar.forEach(factura => {
            const fila = crearFilaFactura(factura);
            fragment.appendChild(fila);
        });

        tablaBody.appendChild(fragment);

    } catch (error) {
        console.error('Error al cargar y renderizar las facturas:', error);
        tablaBody.innerHTML = '<tr><td colspan="8">Error al cargar los datos. Intente más tarde.</td></tr>';
    }
}


// --- 3. FUNCIÓN DE INICIALIZACIÓN DE LA PÁGINA ---

/**
 * Función que se exporta para iniciar toda la funcionalidad de la página de facturas.
 * Configura todos los manejadores de eventos y realiza la carga inicial de datos.
 */
export function iniciarPaginaFacturas() {
    // Configura los handlers para la funcionalidad de AGREGAR.
    // Le pasamos 'renderizarFacturasEnTabla' como callback para que pueda refrescar la lista después de agregar una nueva factura.
    configurarBotonNuevaFactura();
    configurarFormularioAgregar(renderizarFacturasEnTabla);
    configurarCierreModalAgregar();

    // Configura los handlers para la funcionalidad de CONSULTAR.
    configurarCierreModalVer();

    // Configura los handlers para la funcionalidad de BUSCAR.
    // Le pasamos 'renderizarFacturasEnTabla' para que pueda mostrar los resultados del filtro.
    configurarBusquedaFacturas(renderizarFacturasEnTabla);

    // Finalmente, realiza la carga y renderizado inicial de todas las facturas.
    renderizarFacturasEnTabla();
}
