import { iniciarPaginaProveedores } from './Pages/ProveedorAdmin.js';
import { iniciarPaginaProductos } from './Pages/ProductoAdmin.js';
import { iniciarPaginaClientes } from './Pages/ClienteAdmin.js';
document.addEventListener('DOMContentLoaded', () => {
    iniciarPaginaProveedores();
    iniciarPaginaProductos();
    iniciarPaginaClientes();
});