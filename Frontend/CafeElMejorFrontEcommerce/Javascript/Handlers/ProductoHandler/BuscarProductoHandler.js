import { GetByProductoId, GetAll } from './../../APIs/ProductoApi.js';
import { crearFilaProducto } from './../../Components/ProductoComponents/renderTablaProductos.js';


export function configurarBusquedaProducto(cargarProductos) {
    const botonBuscar = document.getElementById('botonBuscar');
    const inputBuscar = document.getElementById('buscar');
    const cuerpoTabla = document.querySelector('.tabla-productos tbody');

    if (!botonBuscar || !inputBuscar || !cuerpoTabla) {
        console.error("Faltan elementos para la búsqueda de producto");
        return;
    }

    // Buscar por CUIT al hacer click
    botonBuscar.addEventListener('click', async () => {
        const idProducto = inputBuscar.value.trim();

         // Si está vacío, volver a cargar todos los productos
        if (idProducto === "") {
            cuerpoTabla.innerHTML = ''; // limpiar tabla
            const productos = await GetAll();
            productos.forEach(p => {
                const fila = crearFilaProducto(p);
                cuerpoTabla.appendChild(fila);
            });
            return;
        }

        try {
            const producto = await GetByProductoId(idProducto);

            cuerpoTabla.innerHTML = ''; // limpiar tabla

            if (producto) {
                const fila = crearFilaProducto(producto);
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