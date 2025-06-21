
import { GetByFacturaId, GetAll } from './../../APIs/FacturaApi.js';
import { crearFilaFactura } from './../../Components/FacturasComponents/renderFactura.js';


export function configurarBusquedaFacturas(renderizarTablaCallback) {
    const inputBuscar = document.getElementById('botonBuscar');
    const botonBuscar = document.querySelector('.opciones-facturas .nuevo');
    const cuerpoTabla = document.querySelector('.tabla-facturas tbody');


    if (!inputBuscar || !botonBuscar || !cuerpoTabla) {
        console.error("No se encontraron los elementos de búsqueda.");
        return;
    }

    botonBuscar.addEventListener('click', async () => {
            const cuit = inputBuscar.value.trim();
    
             // Si está vacío, volver a cargar todos los proveedores
            if (cuit === "") {
                cuerpoTabla.innerHTML = ''; // limpiar tabla
                const proveedores = await GetAll();
                proveedores.forEach(p => {
                    const fila = crearFilaFactura(p);
                    cuerpoTabla.appendChild(fila);
                });
                return;
            }
    
            try {
                const proveedor = await GetByFacturaId(cuit);
    
                cuerpoTabla.innerHTML = ''; // limpiar tabla
    
                if (proveedor) {
                    const fila = crearFilaFactura(proveedor);
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
