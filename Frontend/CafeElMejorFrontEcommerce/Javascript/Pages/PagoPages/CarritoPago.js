// carritoPago.js

import { procesarPago } from './../../Handlers/Pago/PagoHandler.js';

export function iniciarPagoCarrito() {
    const botonFinalizar = document.getElementById('btnfinalizarCompra');

    if (!botonFinalizar) {
        console.error('Botón de finalizar compra no encontrado');
        return;
    }

    botonFinalizar.addEventListener('click', async () => {
        try {
            const url = await procesarPago();
            window.location.href = url;
        } catch (error) {
            console.error('Error al procesar el pago:', error);
            alert(error.message || 'Ocurrió un error al procesar el pago.');
        }
    });
}
