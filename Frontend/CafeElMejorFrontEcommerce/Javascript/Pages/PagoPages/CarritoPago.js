// carritoPago.js

import { procesarPago } from './../../Handlers/PagoHandler/PagoHandler.js';

export function iniciarPagoCarrito() {
    console.log('Entraste a iniciarPagoCarrito');
    const botonFinalizar = document.getElementById('btnfinalizarCompra');

    if (!botonFinalizar) {
        console.error('Botón de finalizar compra no encontrado');
        return;
    }

    botonFinalizar.addEventListener('click', async () => {
        try {
            console.log('Hiciste click en el botón de finalizar compra');
            const url = await procesarPago();
            window.location.href = url;
        } catch (error) {
            console.error('Error al procesar el pago:', error);
            alert(error.message || 'Ocurrió un error al procesar el pago.');
        }
    });
}
