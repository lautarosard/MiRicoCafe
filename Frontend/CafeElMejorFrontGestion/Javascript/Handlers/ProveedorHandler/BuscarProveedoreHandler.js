import { GetByProveedorCuit, GetAll } from './../../APIs/ProveedorApi.js';
import { crearFilaProveedor } from './../../Components/ProveedorComponents/renderTablaProveedores.js';


export function configurarBusquedaProveedor(cargarProveedores) {
    const botonBuscar = document.getElementById('botonBuscar');
    const inputBuscar = document.getElementById('buscar');
    const cuerpoTabla = document.querySelector('.tabla-proveedores tbody');

    if (!botonBuscar || !inputBuscar || !cuerpoTabla) {
        console.error("Faltan elementos para la búsqueda de proveedor");
        return;
    }

    // Buscar por CUIT al hacer click
    botonBuscar.addEventListener('click', async () => {
        const cuit = inputBuscar.value.trim();

         // Si está vacío, volver a cargar todos los proveedores
        if (cuit === "") {
            cuerpoTabla.innerHTML = ''; // limpiar tabla
            const proveedores = await GetAll();
            proveedores.forEach(p => {
                const fila = crearFilaProveedor(p);
                cuerpoTabla.appendChild(fila);
            });
            return;
        }

        try {
            const proveedor = await GetByProveedorCuit(cuit);

            cuerpoTabla.innerHTML = ''; // limpiar tabla

            if (proveedor) {
                const fila = crearFilaProveedor(proveedor);
                cuerpoTabla.appendChild(fila);
            } else {
                cuerpoTabla.innerHTML = '<tr><td colspan="9">No se encontró ningún proveedor con ese CUIT</td></tr>';
            }

        } catch (error) {
            cuerpoTabla.innerHTML = '<tr><td colspan="9">Error al buscar proveedor</td></tr>';
            console.error(error);
        }
    });

    /*//Si se vacía el input, recargar toda la lista
    inputBuscar.addEventListener('input', () => {
        if (inputBuscar.value.trim() === "") {
            cargarProveedores();
        }
    });*/
}
