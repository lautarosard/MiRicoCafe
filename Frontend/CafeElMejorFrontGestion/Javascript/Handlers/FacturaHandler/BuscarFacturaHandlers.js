/**
 * Este handler gestiona la funcionalidad de búsqueda de facturas.
 */
import { GetAll as GetAllFacturas } from './../../APIs/FacturaApi.js';

/**
 * Configura los eventos para el input de búsqueda y el botón "Buscar".
 * @param {Function} renderizarTablaCallback - La función que se usará para volver a dibujar la tabla con los resultados.
 */
export function configurarBusquedaFacturas(renderizarTablaCallback) {
    const inputBuscar = document.getElementById('buscar');
    const botonBuscar = document.querySelector('.opciones-facturas .nuevo');

    if (!inputBuscar || !botonBuscar) {
        console.error("No se encontraron los elementos de búsqueda.");
        return;
    }

    const realizarBusqueda = async () => {
        const terminoBusqueda = inputBuscar.value.toLowerCase().trim();
        
        try {
            // Siempre obtenemos los datos frescos para la búsqueda
            const todasLasFacturas = await GetAllFacturas(); 
            let facturasFiltradas;

            if (terminoBusqueda === '') {
                facturasFiltradas = todasLasFacturas; // Si no hay búsqueda, mostrar todo
            } else {
                facturasFiltradas = todasLasFacturas.filter(f => 
                    f.numero.toLowerCase().includes(terminoBusqueda) ||
                    f.nombreCliente.toLowerCase().includes(terminoBusqueda) ||
                    f.cuitCliente.includes(terminoBusqueda)
                );
            }
            // Llamamos a la función de renderizado que nos pasaron, con los datos filtrados.
            renderizarTablaCallback(facturasFiltradas);
        } catch (error) {
            console.error("Error al realizar la búsqueda:", error);
            alert("No se pudo completar la búsqueda.");
        }
    };

    botonBuscar.addEventListener('click', realizarBusqueda);
    inputBuscar.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            realizarBusqueda();
        }
    });
}
