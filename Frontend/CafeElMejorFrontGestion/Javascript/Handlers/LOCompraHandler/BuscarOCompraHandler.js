import { GetByOrdenDeCompraId, GetAll } from './../../APIs/OCompraApi.js';
import { crearFilaOrdenCompra } from './../../Components/OCListadoComponents/renderTablaListadoOC.js';


export function configurarBusquedaOrdenes(cargarOrdenes) {
    const botonBuscar = document.getElementById('btn-buscar');
    const inputBuscar = document.getElementById('termino-busqueda');
    const cuerpoTabla = document.querySelector('.tabla-ordenes tbody');

    if (!botonBuscar || !inputBuscar || !cuerpoTabla) {
        console.error("Faltan elementos para la búsqueda de producto");
        return;
    }

    // Buscar por CUIT al hacer click
    botonBuscar.addEventListener('click', async () => {
        const idOrdenDeCompra = inputBuscar.value.trim();

         // Si está vacío, volver a cargar todos los productos
        if (idOrdenDeCompra === "") {
            cuerpoTabla.innerHTML = ''; // limpiar tabla
            const ordenes = await GetAll();
            ordenes.forEach(p => {
                const fila = crearFilaProducto(idOrdenDeCompra);
                cuerpoTabla.appendChild(fila);
            });
            return;
        }

        try {
            const producto = await GetByOrdenDeCompraId(idOrdenDeCompra);

            cuerpoTabla.innerHTML = ''; // limpiar tabla

            if (producto) {
                const fila = crearFilaOrdenCompra(producto);
                cuerpoTabla.appendChild(fila);
            } else {
                cuerpoTabla.innerHTML = '<tr><td colspan="9">No se encontró ningún producto con ese ID</td></tr>';
            }

        } catch (error) {
            cuerpoTabla.innerHTML = '<tr><td colspan="9">Error al buscar producto</td></tr>';
            console.error(error);
        }
    });

}