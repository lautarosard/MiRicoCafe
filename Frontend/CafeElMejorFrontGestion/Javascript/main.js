import { iniciarPaginaProveedores } from './Pages/ProveedorAdmin.js';
import { iniciarPaginaProductos } from './Pages/ProductoAdmin.js';
import { iniciarPaginaClientes } from './Pages/ClienteAdmin.js';

import { iniciarPaginaListadoOrdenes } from './Pages/OCompraListadoAdmin.js';
import { iniciarPaginaNuevaOrden } from './Pages/OCompraAdmin.js';
import { iniciarPaginaFacturas } from './Pages/FacturaAdmin.js';

//import { iniciarCerrarSesion } from './Handlers/AuthHandler/CerrarSesion.js';
import { iniciarCerrarSesion } from './Handlers/IndexHandler.js';



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
    
    if (rutaActual.includes("facturas.html")) {
        iniciarPaginaFacturas();
    }
    
    if (rutaActual.includes("listado_orden.html")) {
        iniciarPaginaListadoOrdenes();
    }
    
    if (rutaActual.includes("nueva_orden.html")) {
        iniciarPaginaNuevaOrden();
    }
    if(rutaActual.includes("registrarse.html")){
 //           iniciarPaginaRegistro();
        }
        
    if(rutaActual.includes("index.html")){
            iniciarCerrarSesion();
    }
/*
    if (rutaActual.includes("listado_orden.html")) {
        iniciarPaginaListadoOrdenes();
    }

*/
    

});