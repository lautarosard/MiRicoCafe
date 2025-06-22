import { iniciarPaginaRegistro } from './Pages/AuthPages/RegistroCliente.js';
import { iniciarPaginaLogin } from './Pages/AuthPages/LoginCliente.js';
import { iniciarCerrarSesion } from './Handlers/AuthHandler/CerrarSesion.js';
import { iniciarPaginaProductos} from './Pages/ProductoAdmin.js';
import { iniciarPagoCarrito } from './Pages/PagoPages/CarritoPago.js';

document.addEventListener('DOMContentLoaded', () => {
    const rutaActual = window.location.pathname;
    if(rutaActual.includes("registrarse.html")){
        iniciarPaginaRegistro();
    }

    if(rutaActual.includes("productos.html")){
        iniciarPaginaProductos();
    }
    
    if(rutaActual.includes("iniciar-sesion.html")){
        iniciarPaginaLogin();
        iniciarCerrarSesion();
    }
    
    if(rutaActual.includes("carrito.html")){
        iniciarPagoCarrito();
    }
});


