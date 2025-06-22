
import { GetAll as GetAllOrdenes } from './../../APIs/OCompraApi.js';

// Component: Para crear las filas de la tabla. 
import { crearFilaOrdenCompra } from './../Components/OCListadoComponents/renderTablaListadoOC.js';

// Handlers: Para la lógica de los botones y modales.
import { configurarBusqueda } from './../Handlers/LOCompraHandler/BuscarOCompraHandler.js';
import { configurarCierreModalVer } from './../Handlers/LOCompraHandler/ConsultarOCompraHandler.js';
import { configurarFormularioEditar, configurarCierreModalEditar } from './../Handlers/LOCompraHandler/EditarOCompraHandler.js';


// --- 2. FUNCIÓN PRINCIPAL DE RENDERIZADO ---

async function cargarOrdenes(ordenes = null) {
    const cuerpoTabla = document.querySelector('.tabla-ordenes tbody');
    if (!cuerpoTabla) {
        console.error("No se encontró el cuerpo de la tabla de órdenes.");
        return;
    }
    cuerpoTabla.innerHTML = '<tr><td colspan="5">Cargando...</td></tr>';

    try {
        const ordenesParaMostrar = ordenes || await GetAllOrdenes();
        
        cuerpoTabla.innerHTML = ''; // Limpiar la tabla

        if (ordenesParaMostrar.length === 0) {
            cuerpoTabla.innerHTML = '<tr><td colspan="5">No se encontraron órdenes de compra.</td></tr>';
            return;
        }

        const fragment = document.createDocumentFragment();
        ordenesParaMostrar.forEach(orden => {
            const fila = crearFilaOrdenCompra(orden);
            fragment.appendChild(fila);
        });
        cuerpoTabla.appendChild(fragment);

    } catch (error) {
        console.error('Error al cargar y renderizar las órdenes:', error);
        cuerpoTabla.innerHTML = '<tr><td colspan="5">Error al cargar los datos. Intente más tarde.</td></tr>';
    }
}


// --- 3. FUNCIÓN DE INICIALIZACIÓN DE LA PÁGINA ---


export function iniciarPaginaListadoOrdenes() {
    // 1. Configura la búsqueda. Le pasamos 'cargarOrdenes' como callback
    // para que el buscador pueda redibujar la tabla con los resultados filtrados.
    configurarBusqueda(cargarOrdenes);

    // 2. Configura los botones de cierre de los modales.
    configurarCierreModalVer();
    configurarCierreModalEditar();

    // 3. Configura el formulario para guardar los cambios del modo edición.
    // Le pasamos 'cargarOrdenes' para que refresque la lista después de guardar.
    configurarFormularioEditar(cargarOrdenes);

    // 4. Realiza la carga inicial de todas las órdenes al abrir la página.
    cargarOrdenes();
}
