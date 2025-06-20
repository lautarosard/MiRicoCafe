/**
 * Este archivo contiene el componente encargado de crear una fila <tr>
 * para la tabla de facturas a partir de un objeto de datos de factura.
 */

// Importamos la función que manejará el evento de clic desde la capa de Handlers.
// La crearemos en el próximo paso.
import { abrirModalVerFactura } from '../Handlers/FacturaHandler.js';

/**
 * Formatea un número como moneda local (Peso Argentino).
 * Es una función de utilidad puramente visual para el componente.
 * @param {number} numero - El número a formatear.
 * @returns {string} El número formateado como "$ 1.234,56".
 */
const formatearMoneda = (numero) => {
    if (typeof numero !== 'number') {
        return '$ 0,00';
    }
    return numero.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
};

/**
 * Crea un elemento <tr> (una fila de la tabla) para una factura específica.
 * @param {object} factura - El objeto de factura con todos sus datos.
 * @returns {HTMLTableRowElement} El elemento <tr> listo para ser insertado en el DOM.
 */
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