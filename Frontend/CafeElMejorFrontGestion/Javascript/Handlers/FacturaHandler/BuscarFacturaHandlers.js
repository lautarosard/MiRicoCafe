import { GetByFacturaId, GetAll } from './../../APIs/FacturaApi.js';
import { crearFilaFactura } from './../../Components/FacturasComponents/renderFactura.js';


export function configurarBusquedaFacturas(renderizarTablaCallback) {
    const inputBuscar = document.getElementById('Buscar');
    const botonBuscar = document.querySelector('botonBuscar');
    const cuerpoTabla = document.querySelector('.tabla-facturas tbody');


    if (!inputBuscar || !botonBuscar || !cuerpoTabla) {
        console.error("No se encontraron los elementos de búsqueda.");
        return;
    }

    botonBuscar.addEventListener('click', async () => {
            const id = inputBuscar.value.trim();

             // Si está vacío, volver a cargar todos los proveedores
            if (id === "") {
                cuerpoTabla.innerHTML = ''; // limpiar tabla
                const facturas = await GetAll();
                facturas.forEach(p => {
                    const fila = crearFilaFactura(p);
                    cuerpoTabla.appendChild(fila);
                });
                return;
            }

            try {
                const factura = await GetByFacturaId(id);

                cuerpoTabla.innerHTML = ''; // limpiar tabla

                if (factura) {
                    const fila = crearFilaFactura(factura);
                    cuerpoTabla.appendChild(fila);
                } else {
                    cuerpoTabla.innerHTML = '<tr><td colspan="9">No se encontró ningún proveedor con ese CUIT</td></tr>';
                }

            } catch (error) {
                cuerpoTabla.innerHTML = '<tr><td colspan="9">Error al buscar proveedor</td></tr>';
                console.error(error);
            }
        });
}
