
// --- 1. IMPORTACIONES DE MÓDULOS ---
// API: Para obtener los datos.
import { GetAll as GetAllFacturas} from './../APIs/FacturaApi.js';

// Components: Para crear los elementos HTML.
import { crearFilaFactura } from './../Components/FacturasComponents/renderFactura.js';

// Handlers: Para manejar la interactividad del usuario.
import { configurarBotonNuevaFactura, configurarFormularioAgregar, configurarCierreModalAgregar } from './../Handlers/FacturaHandler/AgregarFacturaHandlers.js';
import { configurarCierreModalVer } from './../Handlers/FacturaHandler/ConsultarFacturaHandlers.js';
import { configurarBusquedaFacturas } from './../Handlers/FacturaHandler/BuscarFacturaHandlers.js';

async function renderizarFacturasEnTabla(facturas) {
    const tablaBody = document.querySelector('.tabla-facturas tbody');
    if (!tablaBody) return;
    
    const facturasParaMostrar = facturas || await GetAllFacturas();
    tablaBody.innerHTML = '';

    if (facturasParaMostrar.length === 0) {
        tablaBody.innerHTML = '<tr><td colspan="6">No hay facturas para mostrar.</td></tr>';
        return;
    }
    
    const fragment = document.createDocumentFragment();
    facturasParaMostrar.forEach(factura => fragment.appendChild(crearFilaFactura(factura)));
    tablaBody.appendChild(fragment);
}

export function iniciarPaginaFacturas() {
    // Se reactivan los handlers para agregar
    configurarBotonNuevaFactura();
    configurarFormularioAgregar(renderizarFacturasEnTabla);
    configurarCierreModalAgregar();

    configurarCierreModalVer();
    configurarBusquedaFacturas(renderizarFacturasEnTabla);
    renderizarFacturasEnTabla();
}