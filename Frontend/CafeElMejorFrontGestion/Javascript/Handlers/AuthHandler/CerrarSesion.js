import { AuthAdmin } from './../../Pages/AuthPages/AuthAdmin.js';

export function iniciarCerrarSesion() {
    const btnCerrarSesion = document.getElementById('btnCerrarSesion');
    
    if (!btnCerrarSesion) {
        console.log('No se encontró botón de cierre de sesión');
        return;
    }

    btnCerrarSesion.addEventListener('click', () => {
        AuthAdmin.cerrarSesion();
    });
}