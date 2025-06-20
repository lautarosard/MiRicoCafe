// /Javascript/main.js
import { iniciarLogicaCarrito } from './pages/CarritoAdmin.js';

// Esto se ejecuta cuando el HTML de la página está listo.
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM listo. Inicializando lógica del carrito...");
    
    // Esta única línea arranca todo:
    // - Configura los botones de "Añadir al carrito".
    // - Configura la página del carrito.
    // - Actualiza la burbuja al cargar la página.
    iniciarLogicaCarrito();
});