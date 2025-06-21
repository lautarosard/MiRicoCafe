/**
 * Este handler gestiona toda la funcionalidad para agregar una nueva factura.
 */
import { CreateFactura } from '../APIs/FacturaApi.js';

/**
 * Configura el botón "Nueva Factura" para que abra el modal de registro.
 */
export function configurarBotonNuevaFactura() {
    const boton = document.querySelector('.cabecera-seccion .nuevo');
    const modal = document.getElementById('modalNuevaFactura');

    if (boton && modal) {
        boton.addEventListener('click', () => {
            modal.style.display = 'flex';
        });
    } else {
        console.error("No se encontró el botón 'Nueva Factura' o el modal correspondiente.");
    }
}

/**
 * Configura el formulario de nueva factura, incluyendo el cálculo automático
 * de IVA/Total y el envío de datos.
 * @param {Function} recargarFacturasCallback - Función que se llamará para refrescar la tabla después de agregar.
 */
export function configurarFormularioAgregar(recargarFacturasCallback) {
    const form = document.getElementById('formNuevaFactura');
    const inputImporte = document.getElementById('nuevoImporte');
    const inputIva = document.getElementById('nuevoIva');
    const inputTotal = document.getElementById('nuevoTotal');
    const modal = document.getElementById('modalNuevaFactura');

    if (!form || !inputImporte || !inputIva || !inputTotal || !modal) {
        console.error("Faltan elementos en el formulario de nueva factura.");
        return;
    }

    // Cálculo automático de IVA y Total
    inputImporte.addEventListener('input', () => {
        const importe = parseFloat(inputImporte.value) || 0;
        const iva = importe * 0.21;
        const total = importe + iva;
        inputIva.value = iva.toFixed(2);
        inputTotal.value = total.toFixed(2);
    });

    // Envío del formulario
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nuevaFactura = {
            numero: document.getElementById('nuevoNumero').value,
            fecha: document.getElementById('nuevoFecha').value,
            cuitCliente: document.getElementById('nuevoCuit').value,
            nombreCliente: document.getElementById('nuevoNombre').value,
            importe: parseFloat(inputImporte.value),
            iva: parseFloat(inputIva.value),
            total: parseFloat(inputTotal.value)
        };

        try {
            await CreateFactura(nuevaFactura);
            alert("Factura agregada con éxito.");
            modal.style.display = "none";
            form.reset();
            if (recargarFacturasCallback) {
                recargarFacturasCallback(); // Llama a la función para recargar y mostrar los datos actualizados.
            }
        } catch (error) {
            alert("Error al agregar la factura.");
            console.error("Error en CreateFactura:", error);
        }
    });
}

/**
 * Configura el botón de cierre (la 'X') del modal de agregar.
 */
export function configurarCierreModalAgregar() {
    const botonCerrar = document.getElementById('cerrarModalNueva');
    const modal = document.getElementById('modalNuevaFactura');

    if (botonCerrar && modal) {
        botonCerrar.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
}
