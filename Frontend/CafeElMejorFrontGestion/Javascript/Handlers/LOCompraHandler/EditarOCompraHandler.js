import { GetByOrdenDeCompraId as GetOrdenById, UpdateOrdenDeCompra as UpdateOrden } from './../../APIs/OCompraApi.js';
/**
 * Handler para toda la funcionalidad de edición de una orden de compra.
 */

import { crearFilaProductoEnOrden } from './../../Components/OCComponents/renderProductoenOrden.js';

// Variable para mantener el ID de la orden que se está editando.
let idOrdenActual = null;
// Variable para mantener el ID del proveedor de la orden que se está editando.
let idProveedorActual = null;


// --- FUNCIONES HELPER DEL MODAL ---


function recalcularTotalesModal() {
    const filasProductos = document.querySelectorAll('#cuerpo-tabla-orden-edit tr');
    let subtotalGeneral = 0;

    filasProductos.forEach(fila => {
        const cantidadInput = fila.querySelector('.input-cantidad-modal');
        const cantidad = cantidadInput ? parseInt(cantidadInput.value, 10) : 0;
        const precio = parseFloat(fila.dataset.precioUnitario); 
        
        if (!isNaN(cantidad) && !isNaN(precio)) { 
            const subtotalFila = cantidad * precio; 
            subtotalGeneral += subtotalFila;
            // Actualiza el subtotal de la fila individual.
            fila.querySelector('.subtotal-producto').textContent = subtotalFila.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
        }
    });

    const iva = subtotalGeneral * 0.21;
    const total = subtotalGeneral + iva;

    document.getElementById('subtotal-orden-edit').textContent = subtotalGeneral.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
    document.getElementById('iva-orden-edit').textContent = iva.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
    document.getElementById('total-orden-edit').textContent = total.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
}


// --- FUNCIONES PRINCIPALES EXPORTADAS ---

export async function abrirModalEditarOrden(orden) {
    const modal = document.getElementById('modalEditarOrden');
    
    if (orden && typeof orden.idOrdenDeCompra !== 'undefined') {
        idOrdenActual = orden.idOrdenDeCompra; 
    } else {
        console.error("Error: El ID de la orden (idOrdenDeCompra) es undefined o nulo al abrir el modal de edición.");
        alert("No se pudo cargar la orden para editar. ID no encontrado.");
        return; 
    }

    if (!modal) return;

    modal.style.display = 'flex';
    
    document.getElementById('numeroOrdenEditada').textContent = `(${orden.idOrdenDeCompra || 'N/A'})`; 
    const cuerpoTablaModal = document.getElementById('cuerpo-tabla-orden-edit');
    cuerpoTablaModal.innerHTML = '<tr><td colspan="5">Cargando productos...</td></tr>';

    try {
        const ordenCompleta = await GetOrdenById(idOrdenActual);
        
        idProveedorActual = ordenCompleta.proveedor ? ordenCompleta.proveedor.idProveedor : null;
        if (idProveedorActual === null) {
            console.warn("Advertencia: idProveedor no encontrado en la orden completa.");
        }

        // 1. Llenar campos generales
        document.getElementById('fecha-orden-edit').value = ordenCompleta.fecha.split('T')[0]; // Formato YYYY-MM-DD
        const selectProveedor = document.getElementById('selector-proveedor-edit');
        // CORREGIDO: Acceder al nombre del proveedor a través del objeto 'proveedor'
        const proveedorNombre = ordenCompleta.proveedor ? ordenCompleta.proveedor.nombre : 'Proveedor Desconocido';
        selectProveedor.innerHTML = `<option value="${idProveedorActual}">${proveedorNombre}</option>`; 
        selectProveedor.disabled = true; // Asegurarse de que no se pueda cambiar

        // 2. Renderizar la tabla de productos
        cuerpoTablaModal.innerHTML = '';
        const fragment = document.createDocumentFragment();
        // Asumiendo que los productos vienen en 'detalles' y cada elemento es un objeto de detalle
        ordenCompleta.detalles.forEach(detalleProducto => { 
            
            const fila = crearFilaProductoEnOrden(detalleProducto); 
            fragment.appendChild(fila);
        });
        cuerpoTablaModal.appendChild(fragment);

        // 3. Calcular totales iniciales
        recalcularTotalesModal();

    } catch (error) {
        cuerpoTablaModal.innerHTML = '<tr><td colspan="5" style="color:red;">Error al cargar los productos.</td></tr>';
        console.error(`Error al cargar la orden para editar ID ${idOrdenActual}:`, error);
        alert(`Error al cargar la orden de compra: ${error.message || error}`);
    }
}

/**
 * Configura todos los eventos interactivos dentro del modal de edición.
 * @param {Function} recargarOrdenesCallback - Función para refrescar la lista principal.
 */
export function configurarModalEdicion(recargarOrdenesCallback) {
    const modal = document.getElementById('modalEditarOrden');
    const cuerpoTablaModal = document.getElementById('cuerpo-tabla-orden-edit');
    const botonGuardar = document.getElementById('btn-guardar-cambios');

    if (!modal || !cuerpoTablaModal || !botonGuardar) return;

    // Event listener para toda la tabla (para recalcular y eliminar)
    cuerpoTablaModal.addEventListener('input', (e) => {
        if (e.target.classList.contains('input-cantidad-modal')) {
            recalcularTotalesModal();
        }
    });

    cuerpoTablaModal.addEventListener('click', (e) => {
        if (e.target.classList.contains('boton-eliminar-item-modal')) {
            e.target.closest('tr').remove();
            recalcularTotalesModal();
        }
    });
    
    // Evento para el botón "Guardar Cambios"
    botonGuardar.addEventListener('click', async () => {
        // Asegúrate de que idOrdenActual tenga un valor antes de intentar guardar
        if (idOrdenActual === null) {
            alert("Error: No hay una orden seleccionada para editar.");
            console.error("No se pudo guardar: idOrdenActual es null.");
            return;
        }
        if (idProveedorActual === null) {
            alert("Error: No se pudo determinar el proveedor para actualizar la orden.");
            console.error("No se pudo guardar: idProveedorActual es null.");
            return;
        }

        // 1. Recolectar datos actualizados
        const fechaActualizada = document.getElementById('fecha-orden-edit').value;
        const filasProductos = document.querySelectorAll('#cuerpo-tabla-orden-edit tr');
        
        const detalleActualizado = Array.from(filasProductos).map(fila => {
            return {
                productoId: parseInt(fila.dataset.idProducto, 10), 
                cantidad: parseInt(fila.querySelector('.input-cantidad-modal').value, 10),
                precioUnitario: parseFloat(fila.dataset.precioUnitario) 
            };
        });

        // 2. Construir el objeto para la API
        const datosParaEnviar = {
            idOrdenDeCompra: idOrdenActual, // El ID de la orden que se está editando
            fecha: fechaActualizada,
            // Incluye idProveedor, que se cargó al abrir el modal
            idProveedor: idProveedorActual, 
            detalles: detalleActualizado
        };

        // 3. Llamar a la API
        try {
            // El primer parámetro de UpdateOrden es el ID de la orden
            await UpdateOrden(idOrdenActual, datosParaEnviar); 
            alert("Orden de compra actualizada con éxito.");
            modal.style.display = 'none';
            recargarOrdenesCallback();
        } catch (error) {
            console.error("Error al actualizar la orden:", error);
            alert(`No se pudieron guardar los cambios. Error: ${error.message || error}`);
        }
    });
}

/**
 * Configura el botón de cierre del modal de edición.
 */
export function configurarCierreModalEditar() {
    const botonCerrar = document.getElementById('cerrarModalEditarOrden');
    const modal = document.getElementById('modalEditarOrden');

    if (botonCerrar && modal) {
        botonCerrar.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
}
