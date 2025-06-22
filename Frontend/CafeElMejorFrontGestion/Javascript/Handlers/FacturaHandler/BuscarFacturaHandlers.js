import { GetByFacturaId, GetAll } from './../../APIs/FacturaApi.js';
import { crearFilaFactura } from './../../Components/FacturasComponents/renderFactura.js';


export function configurarBusquedaFacturas(renderizarTablaCallback) {
    const inputBuscar = document.getElementById('buscar');
    const botonBuscar = document.getElementById('botonBuscar');
    // const botonBuscar = document.querySelector('botonBuscar');
    const cuerpoTabla = document.querySelector('.tabla-facturas tbody');


    if (!inputBuscar || !botonBuscar) return;

    const realizarBusqueda = async () => {
        const id = inputBuscar.value.trim();
        try {
            if (id === "") {
                const todasLasFacturas = await GetAllAPI();
                renderizarTablaCallback(todasLasFacturas);
            } else {
                const factura = await GetByFacturaId(id);
                renderizarTablaCallback(factura ? [factura] : []);
            }
        } catch (error) {
            renderizarTablaCallback([]); // Muestra tabla vacía en caso de error
        }
    };
    
    botonBuscar.addEventListener('click', realizarBusqueda);
    inputBuscar.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') realizarBusqueda();
    });
}
