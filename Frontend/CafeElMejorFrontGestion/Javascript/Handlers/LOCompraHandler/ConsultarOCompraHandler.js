
// 1. IMPORTACIONES NECESARIAS
import { GetByOrdenDeCompraId as GetOrdenById } from './../../APIs/OCompraApi.js';

function formatearMoneda(numero) {
    if (typeof numero !== 'number' || isNaN(numero)) {
        return '$ 0,00';
    }
    return numero.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
}


export async function abrirModalVerOrden(ordenResumen) {
    
    // --- INICIO DE LA CORRECCIÓN ---
    // Verificamos que 'ordenResumen' y su ID existan antes de hacer nada.
    if (!ordenResumen || typeof ordenResumen.idOrdenDeCompra === 'undefined') {
        console.error("Error crítico: La función 'abrirModalVerOrden' fue llamada sin un objeto de orden válido.", ordenResumen);
        alert("Error: No se pudieron obtener los datos de la orden seleccionada.");
        return;
    }
    
    const idParaBuscar = ordenResumen.idOrdenDeCompra;
    // --- FIN DE LA CORRECCIÓN ---
    // 2. IDs DE TU HTML
    const modal = document.getElementById('modalVerOrden');
    const cuerpoTabla = document.getElementById('cuerpo-tabla-ver-detalles');
    const numeroOrdenElem = document.getElementById('numeroOrdenVer');
    const fechaOrdenElem = document.getElementById('fechaOrdenVer');
    const proveedorOrdenElem = document.getElementById('proveedorOrdenVer');
    const totalOrdenElem = document.getElementById('totalOrdenVer');

    if (!modal || !cuerpoTabla) {
        console.error("Error crítico: No se encontraron los elementos del modal para ver la orden.");
        alert("Error al intentar abrir la vista de la orden.");
        return;
    }

    // 3. MUESTRA EL MODAL Y UN MENSAJE DE CARGA
    modal.style.display = 'flex';
    cuerpoTabla.innerHTML = '<tr><td colspan="4" style="text-align:center;">Cargando detalles...</td></tr>';

    // Llena los datos generales que ya tienes del resumen.
    if(numeroOrdenElem) numeroOrdenElem.textContent = ordenResumen.idOrdenDeCompra;
    if(fechaOrdenElem) fechaOrdenElem.textContent = new Date(ordenResumen.fecha).toLocaleDateString('es-AR');
    if(proveedorOrdenElem) proveedorOrdenElem.textContent = ordenResumen.proveedor.nombre;
    if(totalOrdenElem) totalOrdenElem.textContent = formatearMoneda(ordenResumen.total);

    // 4. BLOQUE TRY...CATCH PARA LA LLAMADA A LA API
    try {
        const ordenCompleta = await GetOrdenById(ordenResumen.idOrdenDeCompra);

        // Dejamos este console.log para que puedas verificar la estructura exacta que devuelve la API
        console.log("Respuesta de la API para orden completa:", ordenCompleta);

        // 5. VERIFICA LA RESPUESTA Y RENDERIZA LOS DETALLES
        // CORRECCIÓN: Usaremos 'detalles' (plural) consistentemente. 
        // Si tu API devuelve 'detalle' (singular), cambia las 3 instancias de abajo.
        if (ordenCompleta && Array.isArray(ordenCompleta.detalles)) {
            
            if(ordenCompleta.detalles.length === 0) {
                cuerpoTabla.innerHTML = '<tr><td colspan="4" style="text-align:center;">Esta orden no tiene productos cargados.</td></tr>';
                return;
            }

            const filasHtml = ordenCompleta.detalles.map(item => {
                const subtotal = (item.cantidad || 0) * (item.precioUnitario || 0);
                
                // --- INICIO DE LA CORRECCIÓN CLAVE ---
                // Tu código mostraba 'item.productoId', que es solo un número.
                // Lo correcto es mostrar el nombre del producto, que probablemente está en un objeto anidado.
                // Usamos 'item.producto?.nombre' para acceder de forma segura.
                const nombreProducto = item.producto|| 'Producto no especificado';
                // --- FIN DE LA CORRECCIÓN CLAVE ---

                return `
                    <tr>
                        <td>${nombreProducto}</td>
                        <td style="text-align:center;">${item.cantidad}</td>
                        <td style="text-align:right;">${formatearMoneda(item.precioUnitario)}</td>
                        <td style="text-align:right;">${formatearMoneda(subtotal)}</td>
                    </tr>
                `;
            }).join('');
            
            cuerpoTabla.innerHTML = filasHtml;

        } else {
            cuerpoTabla.innerHTML = '<tr><td colspan="4" style="text-align:center;">No se encontraron detalles para esta orden.</td></tr>';
        }

    } catch (error) {
        // --- MANEJO DE ERROR MEJORADO ---
        // Esto nos dará el mensaje de error exacto del backend en la consola.
        const mensajeError = error.response?.data?.message || error.message || "Error desconocido.";
        console.error("Error detallado al cargar los detalles de la orden:", mensajeError);
        cuerpoTabla.innerHTML = `<tr><td colspan="4" style="text-align:center; color:red;">Error: ${mensajeError}</td></tr>`;
    }
}

/**
 * Configura el botón de cierre del modal.
 */
export function configurarCierreModalVer() {
    const botonCerrar = document.getElementById('cerrarModalVerOrden');
    const modal = document.getElementById('modalVerOrden');

    if (botonCerrar && modal) {
        botonCerrar.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        modal.addEventListener('click', (e) => {
            if(e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
}