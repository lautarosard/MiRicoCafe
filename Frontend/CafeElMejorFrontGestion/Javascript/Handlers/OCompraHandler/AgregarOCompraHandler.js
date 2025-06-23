
import { CreateOrdenDeCompra as CreateOrdenDeCompra } from './../../APIs/OCompraApi.js';
import { crearFilaProductoEnOrden } from './../../Components/OCComponents/renderTablaOC.js';

// Guardamos los productos de la orden actual en un array en memoria.
// Guardamos los productos de la orden actual en un array en memoria.
let productosEnOrden = [];

/**
 * Recalcula y actualiza los totales (Subtotal, IVA, Total) en la página.
 */
function actualizarTotales() {
    const subtotal = productosEnOrden.reduce((sum, p) => sum + (p.precio * p.cantidad), 0);
    const iva = subtotal * 0.21;
    const total = subtotal + iva;

    const formatear = (num) => num.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });

    document.getElementById('subtotal-orden').textContent = formatear(subtotal);
    document.getElementById('iva-orden').textContent = formatear(iva);
    document.getElementById('total-orden').textContent = formatear(total);
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
        return;
    }

    // --- CORRECCIÓN 1: Guardamos un objeto simple, solo con lo que necesitamos. ---
    const productoParaOrden = {
        idProducto: producto.idProducto,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: 1 // La cantidad inicial siempre es 1.
    };
    
    productosEnOrden.push(productoParaOrden);
    renderizarTablaOrden();
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
            if (producto) {
                producto.cantidad = nuevaCantidad >= 1 ? nuevaCantidad : 1; // La cantidad no puede ser menor a 1
            }
            
            renderizarTablaOrden(); // Redibuja la tabla para actualizar subtotales
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

        // --- CORRECCIÓN 2: Construimos el objeto para la API con la estructura exacta. ---
        const ordenParaEnviar = {
            idProveedor: parseInt(idProveedor, 10),
            fechaRegistro: fecha, // El backend espera 'fechaRegistro'
            Detalles: productosEnOrden.map(p => ({
                productoId: p.idProducto,        // El backend espera 'productoId'
                cantidad: parseInt(p.cantidad, 10),
                precioUnitario: p.precio         // El backend espera 'precioUnitario'
            }))
        };
        
        console.log("Enviando a la API:", ordenParaEnviar);

        try {
            await CreateOrdenDeCompra(ordenParaEnviar);
            alert("¡Orden de compra registrada con éxito!");
            // Limpiar todo para una nueva orden
            productosEnOrden = [];
            document.getElementById('selector-proveedor').value = '';
            document.getElementById('fecha-orden').value = new Date().toISOString().split('T')[0];
            renderizarTablaOrden();
        } catch(error) {
            console.error("Error al registrar la orden:", error);
            const errorMsg = error.response?.data?.title || "No se pudo registrar la orden de compra.";
            alert(`Error: ${errorMsg}`);
        }
    });
}