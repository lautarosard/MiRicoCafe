import { GetByOrdenDeCompraId as GetOrdenByNumero, GetAll as GetAllOrdenes } from './../../APIs/OCompraApi.js';


export function configurarBusqueda(renderizarTablaCallback) {
    const inputBusqueda = document.getElementById('termino-busqueda');
    const botonBuscar = document.getElementById('btn-buscar');

    if (!inputBusqueda || !botonBuscar) {
        console.error("No se encontraron los elementos de búsqueda en el HTML.");
        return;
    }

    const ejecutarBusqueda = async () => {
        const termino = inputBusqueda.value.trim();
        let resultados = [];

        try {
            if (termino === "") {
                // Si la búsqueda está vacía, obtenemos todas las órdenes.
                resultados = await GetAllOrdenes();
            } else {
                // Si hay un término, buscamos por ese número de orden.
                const ordenEncontrada = await GetOrdenByNumero(termino);
                resultados = ordenEncontrada ? [ordenEncontrada] : []; // La tabla espera un array.
            }
            
            // Llamamos a la función que nos pasaron para que dibuje la tabla con los resultados.
            renderizarTablaCallback(resultados);

        } catch (error) {
            console.error(`Error al buscar la orden "${termino}":`, error);
            alert("Error al realizar la búsqueda.");
            // Opcional: limpiar la tabla en caso de error.
            renderizarTablaCallback([]);
        }
    };

    botonBuscar.addEventListener('click', ejecutarBusqueda);
    inputBusqueda.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            ejecutarBusqueda();
        }
    });
}
