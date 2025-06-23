
const formatearMoneda = (numero) => {
    if (typeof numero !== 'number') return '$ 0,00';
    return numero.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
};


export function abrirModalVerFactura(factura) {
    const modal = document.getElementById('modalVerFactura');
    const contenido = document.getElementById('detallesFacturaContenido');

    if (modal && contenido) {
        contenido.innerHTML = `
            <p><strong>Número:</strong> ${factura.numero}</p>
            <p><strong>Fecha de Emisión:</strong> ${new Date(factura.fecha + 'T00:00:00').toLocaleDateString('es-AR')}</p>
            <p><strong>Cliente:</strong> ${factura.nombreCliente}</p>
            <p><strong>CUIT:</strong> ${factura.cuitCliente}</p>
            <hr>
            <p><strong>Importe Neto:</strong> ${formatearMoneda(factura.importe)}</p>
            <p><strong>IVA (21%):</strong> ${formatearMoneda(factura.iva)}</p>
            <p><strong>Total Facturado:</strong> ${formatearMoneda(factura.total)}</p>
        `;
        modal.style.display = 'flex';
    } else {
        console.error("No se encontraron los elementos del modal para ver factura.");
    }
}


export function configurarCierreModalVer() {
    const botonCerrar = document.getElementById('cerrarModalVer');
    const modal = document.getElementById('modalVerFactura');

    if (botonCerrar && modal) {
        botonCerrar.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
}
