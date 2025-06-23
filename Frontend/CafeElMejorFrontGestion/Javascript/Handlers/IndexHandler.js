import { AuthAdmin } from './../Pages/AuthAdmin.js';


//cerrar sesion
export function iniciarCerrarSesion() {
    console.log("Función iniciarCerrarSesion iniciada.");
    const btnCerrarSesion = document.getElementById('boton-salirCuenta');
    
    if (!btnCerrarSesion) {
        console.log('No se encontró botón de cierre de sesión');
        return;
    }

    btnCerrarSesion.addEventListener('click', () => {
        console.log('Clic detectado en botón de salir');
        AuthAdmin.cerrarSesion();
    });
}
