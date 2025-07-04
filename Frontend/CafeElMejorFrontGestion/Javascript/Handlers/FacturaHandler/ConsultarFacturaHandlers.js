import { GetByFacturaId as GetByFacturaIdAPI } from './../../APIs/FacturaApi.js';

const formatearMonedaModal = (numero) => {
    if (typeof numero !== 'number' || isNaN(numero)) return '$ 0,00';
    return numero.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
};
const formatearFechaModal = (fechaString) => {
    if (!fechaString) return 'Fecha inválida';
    const fecha = new Date(fechaString);
    if (isNaN(fecha.getTime())) return 'Fecha inválida';
    return fecha.toLocaleDateString('es-AR');
};

const crearHtmlDetalles = (detalles) => {
    if (!Array.isArray(detalles) || detalles.length === 0) {
        return '<p>No hay detalles de productos para esta factura.</p>';
    }
    
    let tablaHtml = `
        <table class="tabla-detalles-modal">
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio Unit.</th>
                    <th>Subtotal</th>
                </tr>
            </thead>
            <tbody>
    `;
    detalles.forEach(item => {
        const nombreProducto = item.producto ? item.producto.nombre : (item.name || 'Producto no especificado');
        const subtotalItem = item.cantidad * item.precioUnitario;

        tablaHtml += `
            <tr>
                <td>${nombreProducto}</td>
                <td>${item.cantidad || 0}</td>
                <td>${formatearMonedaModal(item.precioUnitario)}</td>
                <td>${formatearMonedaModal(subtotalItem)}</td>
            </tr>
        `;
    });
    tablaHtml += '</tbody></table>';
    return tablaHtml;
};

export async function abrirModalVerFactura(idFactura) {
    const modal = document.getElementById('modalVerFactura');
    const contenido = document.getElementById('detallesFacturaContenido');
    if (!modal || !contenido) return;

    contenido.innerHTML = '<p>Cargando detalles...</p>';
    modal.style.display = 'flex';

    try {
        const factura = await GetByFacturaIdAPI(idFactura);
        
        contenido.innerHTML = `
            <div class="detalle-info-general">
                <p><strong>Número de Factura:</strong> ${factura.idFactura}</p>
                <p><strong>Fecha:</strong> ${formatearFechaModal(factura.fechaEmision)}</p>
                <p><strong>Cliente:</strong> ${factura.cliente ? factura.cliente.nombre : 'N/A'} (ID: ${factura.cliente ? factura.cliente.idCliente : 'N/A'})</p>
                <p><strong>CUIT:</strong> ${factura.cuit}</p>
            </div>
            <hr>
            <h4>Detalle de Productos</h4>
            ${crearHtmlDetalles(factura.detalles)}
            <hr>
            <div class="detalle-totales">
                <p><strong>Total Facturado:</strong> ${formatearMonedaModal(factura.total)}</p>
            </div>
        `;
    } catch (error) {
        contenido.innerHTML = '<p style="color:red;">Error al cargar los detalles de la factura.</p>';
        console.error("Error en abrirModalVerFactura:", error);
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
