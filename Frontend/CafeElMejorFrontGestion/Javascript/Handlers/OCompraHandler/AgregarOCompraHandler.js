
import { CreateOrdenDeCompra as CreateOrdenCompra } from './../../APIs/OCompraApi.js';
import { crearFilaProductoEnOrden } from './../../Components/OCComponents/renderTablaOC.js';

// Guardamos los productos de la orden actual en un array en memoria.
let productosEnOrden = [];

/**
 * Recalcula y actualiza los totales (Subtotal, IVA, Total) en la página.
 */
function actualizarTotales() {
    const subtotal = productosEnOrden.reduce((sum, p) => sum + (p.precio * p.cantidad), 0);
    const iva = subtotal * 0.21;
    const total = subtotal + iva;

    document.getElementById('subtotal-orden').textContent = subtotal.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
    document.getElementById('iva-orden').textContent = iva.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
    document.getElementById('total-orden').textContent = total.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
}

/**
 * Dibuja la tabla principal con los productos que están en la orden.
 */
function renderizarTablaOrden() {
    const cuerpoTabla = document.getElementById('cuerpo-tabla-orden');
    const mensajeVacio = document.getElementById('mensaje-tabla-vacia');
    cuerpoTabla.innerHTML = '';

    if (productosEnOrden.length === 0) {
        mensajeVacio.style.display = 'block';
    } else {
        mensajeVacio.style.display = 'none';
        const fragment = document.createDocumentFragment();
        productosEnOrden.forEach(p => fragment.appendChild(crearFilaProductoEnOrden(p)));
        cuerpoTabla.appendChild(fragment);
    }
    actualizarTotales();
}


export function agregarProductoAOrden(producto) {
    const yaExiste = productosEnOrden.find(p => p.idProducto === producto.idProducto);

    if (yaExiste) {
        alert(`El producto "${producto.nombre}" ya está en la orden.`);
    } else {
        productosEnOrden.push(producto);
        renderizarTablaOrden();
    }
}

/**
 * Configura los eventos de la tabla principal (cambiar cantidad, eliminar item).
 */
export function configurarTablaPrincipal() {
    const cuerpoTabla = document.getElementById('cuerpo-tabla-orden');
    cuerpoTabla.addEventListener('change', (e) => {
        if (e.target.classList.contains('input-cantidad')) {
            const id = parseInt(e.target.closest('tr').dataset.idProducto, 10);
            const nuevaCantidad = parseInt(e.target.value, 10);
            
            const producto = productosEnOrden.find(p => p.idProducto === id);
            if (producto) producto.cantidad = nuevaCantidad;
            
            renderizarTablaOrden();
        }
    });

    cuerpoTabla.addEventListener('click', (e) => {
        if (e.target.classList.contains('boton-eliminar-item')) {
            const id = parseInt(e.target.closest('tr').dataset.idProducto, 10);
            productosEnOrden = productosEnOrden.filter(p => p.idProducto !== id);
            renderizarTablaOrden();
        }
    });
}

/**
 * Configura el botón final "Registrar Orden".
 */
export function configurarBotonRegistrar() {
    const botonRegistrar = document.getElementById('btn-registrar-orden');
    botonRegistrar.addEventListener('click', async () => {
        const idProveedor = document.getElementById('selector-proveedor').value;
        const fecha = document.getElementById('fecha-orden').value;

        if (!idProveedor) {
            alert("Por favor, seleccione un proveedor.");
            return;
        }
        if (productosEnOrden.length === 0) {
            alert("Debe agregar al menos un producto a la orden.");
            return;
        }

        const ordenParaEnviar = {
            idProveedor: parseInt(idProveedor, 10),
            fechaRegistro: fecha,
            detalle: productosEnOrden.map(p => ({
                idProducto: p.idProducto,
                cantidad: p.cantidad,
                precio: p.precio
            }))
        };
        
        try {
            await CreateOrdenCompra(ordenParaEnviar);
            alert("¡Orden de compra registrada con éxito!");
            // Limpiar todo para una nueva orden
            productosEnOrden = [];
            document.getElementById('selector-proveedor').value = '';
            renderizarTablaOrden();
        } catch(error) {
            console.error("Error al registrar la orden:", error);
            alert("No se pudo registrar la orden de compra.");
        }
    });

}
