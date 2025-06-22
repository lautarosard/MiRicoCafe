import { iniciarPaginaRegistro } from './Pages/AuthPages/RegistroCliente.js';
import { iniciarPaginaLogin } from './Pages/AuthPages/LoginCliente.js';
import { iniciarCerrarSesion } from './Handlers/AuthHandler/CerrarSesion.js';


document.addEventListener('DOMContentLoaded', () => {
    const rutaActual = window.location.pathname;
    if(rutaActual.includes("registrarse.html")){
        iniciarPaginaRegistro();
    }

    if(rutaActual.includes("iniciar-sesion.html")){
        iniciarPaginaLogin();
        iniciarCerrarSesion();
    }
    
});


