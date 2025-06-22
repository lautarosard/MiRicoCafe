import { ObtenerCarrito as ObtenerCarritoPorCliente } from './../../APIs/CarritoApi.js';
import { CrearPreferencia } from './../../APIs/MercadoPagoApi.js';

export async function procesarPago() {
    console.log("Procesando pago...");
    const clienteId = parseInt(localStorage.getItem('clienteId'));
    if (!clienteId) throw new Error("Cliente no autenticado");

    const carrito = await ObtenerCarritoPorCliente(clienteId);
    const productos = carrito.items;

    if (!Array.isArray(productos) || productos.length === 0) {
        throw new Error("Tu carrito está vacío");
    }

    const mpProductos = productos.map(item => ({
        productoId: item.productoId,
        cantidad: item.cantidad
    }));

    const pagoRequest = {
        clienteId: clienteId,
        mpProductos: mpProductos
    };

    const { url } = await CrearPreferencia(pagoRequest);
    console.log("URL de pago:", url);
    return url;
}
