
import { abrirModalVerFactura } from './../FacturasComponents/renderFactura.js';


const formatearMoneda = (numero) => {
    if (typeof numero !== 'number') {
        return '$ 0,00';
    }
    return numero.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
};


export function crearFilaFactura(factura) {
    const fila = document.createElement('tr');

    // Usamos un template string para construir el HTML interno de la fila.
    fila.innerHTML = `
        <td>${factura.numero}</td>
        <td>${new Date(factura.fecha + 'T00:00:00').toLocaleDateString('es-AR')}</td>
        <td>${factura.cuitCliente}</td>
        <td>${factura.nombreCliente}</td>
        <td>${formatearMoneda(factura.importe)}</td>
        <td>${formatearMoneda(factura.iva)}</td>
        <td>${formatearMoneda(factura.total)}</td>
        <td class="actions">
            <button class="view" title="Ver" data-numero="${factura.numero}">👁️</button>
        </td>
    `;

    // Buscamos el botón "Ver" DENTRO de la fila que acabamos de crear.
    const botonVer = fila.querySelector('.view');

    // Le asignamos el evento de clic.
    // La lógica de QUÉ HACER se delega a la función del Handler.
    botonVer.addEventListener('click', () => {
        abrirModalVerFactura(factura);
    });

    return fila;
}