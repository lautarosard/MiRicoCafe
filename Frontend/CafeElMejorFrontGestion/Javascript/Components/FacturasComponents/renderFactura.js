import { abrirModalVerFactura } from './../../Handlers/FacturaHandler/ConsultarFacturaHandlers.js';


const formatearMoneda = (numero) => {
    if (typeof numero !== 'number' || isNaN(numero)) return '$ 0,00';
    return numero.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
};

const formatearFecha = (fechaString) => {
    if (!fechaString) return 'Fecha inválida';
    const fecha = new Date(fechaString);
    if (isNaN(fecha.getTime())) return 'Fecha inválida';
    return fecha.toLocaleDateString('es-AR');
};

export function crearFilaFactura(factura) {
    const fila = document.createElement('tr');
    
    // CORRECCIÓN: La fila ahora solo muestra las 6 columnas solicitadas.
    fila.innerHTML = `
        <td>${factura.idFactura || 'N/A'}</td>
        <td>${formatearFecha(factura.fechaEmision)}</td>
        <td>${factura.cliente ? factura.cliente.idCliente : 'N/A'}</td>
        <td>${factura.cuit || 'N/A'}</td>
        <td>${formatearMoneda(factura.total)}</td>
        <td class="actions">
            <button class="view" title="Ver Detalle" data-id-factura="${factura.idFactura || ''}">👁️</button>
        </td>
    `;

    const botonVer = fila.querySelector('.view');
    botonVer.addEventListener('click', () => {
        // Se sigue pasando el ID para que el handler busque la info completa.
        abrirModalVerFactura(factura.idFactura);
    });

    return fila;
}