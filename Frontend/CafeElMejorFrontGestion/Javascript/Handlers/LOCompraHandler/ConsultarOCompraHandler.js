import { GetByOrdenDeCompraId as GetOrdenById } from './../../APIs/OCompraApi.js';

// Función para formatear moneda, útil para la visualización.
const formatearMoneda = (numero) => numero.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });


export async function abrirModalVerOrden(orden) {
    const modal = document.getElementById('modalVerOC');
    const contenido = document.getElementById('detallesOCContenido');

    if (!modal || !contenido) {
        console.error("No se encontraron los elementos del modal 'Ver Detalles'.");
        return;
    }

    // Muestra un mensaje de "Cargando..." mientras se obtienen los detalles.
    contenido.innerHTML = '<p>Cargando detalles...</p>';
    modal.style.display = 'flex';

    try {
        // Llama a la API para obtener los detalles completos, incluyendo los productos.
        const ordenCompleta = await GetOrdenById(orden.idOrden); // Asumiendo que 'orden' tiene un 'idOrden'.

        // Construye el HTML con los detalles.
        let productosHtml = ordenCompleta.productos.map(p => 
            `<li>${p.cantidad} x ${p.nombre} - Subtotal: ${formatearMoneda(p.subtotal)}</li>`
        ).join('');

        contenido.innerHTML = `
            <p><strong>Nro. de Orden:</strong> ${ordenCompleta.numeroOrden}</p>
            <p><strong>Proveedor:</strong> ${ordenCompleta.proveedorNombre}</p>
            <p><strong>Fecha:</strong> ${new Date(ordenCompleta.fechaRegistro).toLocaleDateString('es-AR')}</p>
            <hr>
            <h4>Productos:</h4>
            <ul>${productosHtml}</ul>
            <hr>
            <p><strong>Monto Total:</strong> ${formatearMoneda(ordenCompleta.montoTotal)}</p>
        `;
    } catch (error) {
        console.error("Error al cargar los detalles de la orden:", error);
        contenido.innerHTML = '<p style="color: red;">No se pudieron cargar los detalles de la orden.</p>';
    }
}

/**
 * Configura el botón de cierre (la 'X') del modal de ver detalles.
 */
export function configurarCierreModalVer() {
    const botonCerrar = document.getElementById('cerrarModalVer');
    const modal = document.getElementById('modalVerOC');

    if (botonCerrar && modal) {
        botonCerrar.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
}
