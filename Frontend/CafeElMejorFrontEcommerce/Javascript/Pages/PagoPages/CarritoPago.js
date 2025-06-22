import { CrearPreferencia } from './../../APIs/MercadoPagoApi.js'; // ajustá la ruta según tu estructura

document.getElementById('btnfinalizarCompra').addEventListener('click', async () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    const clienteId = localStorage.getItem('clienteId'); // o el ID guardado en el token si lo tenés

    if (!clienteId) {
        alert("Debes iniciar sesión para continuar con el pago.");
        return;
    }

    // Armar el objeto PagoRequest (como espera el backend)
    const dto = {
        clienteId: parseInt(clienteId),
        productos: carrito.map(item => ({
            productoId: item.id,
            cantidad: item.cantidad,
            precio: item.precio
        }))
    };

    try {
        const respuesta = await CrearPreferencia(dto);
        
        if (respuesta?.url) {
            // Redirigir a Mercado Pago
            window.location.href = respuesta.url;
        } else {
            alert("No se pudo obtener la URL de pago.");
        }
    } catch (error) {
        console.error("Error al crear preferencia:", error);
        alert("Hubo un error al iniciar el pago. Intenta nuevamente.");
    }
});
