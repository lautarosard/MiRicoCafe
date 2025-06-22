// =================================================================
// ARCHIVO 3: Handlers/AgregarProductoCarritoHandlers.js
// Responsabilidad: Manejar el clic de "Añadir al carrito".
// =================================================================

import { AgregarItemAlCarrito, ObtenerCarrito } from './../APIs/Carrito.js';
import { GetByProductoId, UpdateProducto } from './../APIs/ProductoApi.js';

export function configurarBotonesAgregarAlCarrito(actualizarBurbujaCarrito) {
    document.addEventListener('click', async (e) => {
        if (!e.target.classList.contains('btn-anadir-carrito')) return;

        const boton = e.target;
        const idProducto = parseInt(boton.dataset.id, 10);
        const card = boton.closest('.producto-card');
        const inputCantidad = card.querySelector('input[type="number"]');
        let cantidadSolicitada = parseInt(inputCantidad.value, 10);

        if (isNaN(cantidadSolicitada) || cantidadSolicitada < 1) {
            alert("Cantidad inválida");
            inputCantidad.value = 1;
            return;
        }

        const clienteId = parseInt(localStorage.getItem("clienteId"), 10);
        if (!clienteId) {
            alert("Debe iniciar sesión para agregar productos al carrito.");
            return;
        }

        try {
            const producto = await GetByProductoId(idProducto);
            const carrito = await ObtenerCarrito(clienteId); // se espera objeto con .productos

            const productosEnCarrito = carrito.productos || [];
            const itemEnCarrito = productosEnCarrito.find(p => p.idProducto === idProducto);
            const cantidadEnCarrito = itemEnCarrito ? itemEnCarrito.cantidad : 0;

            const stockDisponible = producto.stock;

            if (cantidadSolicitada > stockDisponible) {
                alert(`Solo hay ${stockDisponible} unidades disponibles para agregar.`);
                inputCantidad.value = stockDisponible;
                return;
            }

            // Agregar al carrito
            await AgregarItemAlCarrito(clienteId, idProducto, cantidadSolicitada);

            // Actualizar stock del producto en base de datos
            const nuevoStock = producto.stock - cantidadSolicitada;
            await UpdateProducto(idProducto, { ...producto, stock: nuevoStock });

            // Actualizar UI
            const stockElemento = card.querySelector('.producto-stock');
            if (stockElemento) {
                stockElemento.textContent = `Stock disponible: ${nuevoStock}`;
                inputCantidad.max = nuevoStock;
                if (nuevoStock <= 0) inputCantidad.disabled = true;
            }

            inputCantidad.value = 1;

            alert(`Se agregó ${cantidadSolicitada} x ${producto.nombre} al carrito.`);

            if (actualizarBurbujaCarrito) actualizarBurbujaCarrito();

        } catch (error) {
            console.error("Error al agregar producto al carrito:", error);
            alert("No se pudo agregar el producto al carrito. Intenta nuevamente.");
        }
    });
}