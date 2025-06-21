// =================================================================
// ARCHIVO 3: Handlers/AgregarProductoHandler.js
// Responsabilidad: Manejar el clic de "Añadir al carrito".
// =================================================================
import CarritoAPI from './../APIs/Carrito.js';
import { GetByProductoId, UpdateProducto } from './../APIs/ProductoApi.js';

export function configurarBotonesAgregarAlCarrito() {
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

        try {
            const producto = await GetByProductoId(idProducto);
            const carrito = await CarritoAPI.get();

            const itemEnCarrito = carrito.find(item => item.id === idProducto);
            const cantidadEnCarrito = itemEnCarrito ? itemEnCarrito.quantity : 0;
            const stockDisponible = producto.stock;

            if (cantidadSolicitada > stockDisponible) {
                alert(`Solo hay ${stockDisponible} unidades disponibles para agregar.`);
                inputCantidad.value = stockDisponible > 0 ? stockDisponible : 1;
                return;
            }

            const nuevaCantidadTotal = cantidadEnCarrito + cantidadSolicitada;

            // Agrega o actualiza en el carrito
            if (itemEnCarrito) {
                await CarritoAPI.updateQuantity(idProducto, nuevaCantidadTotal);
            } else {
                await CarritoAPI.add({
                    id: producto.idProducto,
                    nombre: producto.nombre,
                    precio: producto.precio,
                    quantity: cantidadSolicitada
                });
            }

            // Actualizar stock en la base de datos
            const nuevoStock = stockDisponible - cantidadSolicitada;
            await UpdateProducto(idProducto, { ...producto, stock: nuevoStock });

            alert(`Se agregó ${cantidadSolicitada} x ${producto.nombre} al carrito.`);

            // Actualizar el texto de stock visual
            const stockElemento = card.querySelector('.producto-stock');
            if (stockElemento) {
                stockElemento.textContent = `Stock disponible: ${nuevoStock}`;
                inputCantidad.max = nuevoStock;
                if (nuevoStock <= 0) inputCantidad.disabled = true;
            }

            // Resetear input
            inputCantidad.value = 1;

        } catch (error) {
            console.error("Error al agregar producto al carrito:", error);
            alert("No se pudo agregar el producto al carrito. Intenta nuevamente.");
        }
    });
}
