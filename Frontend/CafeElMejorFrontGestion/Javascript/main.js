import { iniciarPaginaProveedores } from './Pages/ProveedorAdmin.js';
import { iniciarPaginaProductos } from './Pages/ProductoAdmin.js';
import { iniciarPaginaClientes } from './Pages/ClienteAdmin.js';
import { iniciarPaginaFacturas } from './Pages/FacturaAdmin.js';
import { iniciarPaginaLOCompra } from './Pages/OCompraAdmin.js';

document.addEventListener('DOMContentLoaded', () => {
    const rutaActual = window.location.pathname;

    if (rutaActual.includes("productos.html")) {
        iniciarPaginaProductos();
    }

    if (rutaActual.includes("clienteAdmin.html")) {
        iniciarPaginaClientes();
    }

    if (rutaActual.includes("proveedores.html")) {
        iniciarPaginaProveedores();
    }

    if (rutaActual.includes("listado_orden.html")) {
        iniciarPaginaLOCompra();
    }

    if (rutaActual.includes("facturas.html")) {
        iniciarPaginaFacturas();
    }
});