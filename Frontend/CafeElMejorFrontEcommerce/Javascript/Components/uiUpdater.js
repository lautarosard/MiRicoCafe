import { AuthAdmin } from './../Pages/AuthPages/AuthAdmin.js';

export function actualizarUIAutenticacion() {
    const dropdownMenu = document.getElementById('user-dropdown-menu');
    if (!dropdownMenu) return; // Si no encuentra el menú, no hace nada

    // Limpiamos el menú actual
    dropdownMenu.innerHTML = '';

    if (AuthAdmin.estaAutenticado()) {
        // --- El usuario ESTÁ autenticado ---
        // Creamos el item "Cerrar Sesión"
        const cerrarSesionLi = document.createElement('li');
        const cerrarSesionA = document.createElement('a');
        cerrarSesionA.href = '#'; // Usamos '#' porque la acción la maneja JS
        cerrarSesionA.textContent = 'Cerrar Sesión';
        
        cerrarSesionA.addEventListener('click', async (e) => {
            e.preventDefault(); // Evita que la página navegue a '#'
            await AuthAdmin.cerrarSesion();
            alert('Sesión cerrada exitosamente.');
            // Volvemos a actualizar la UI para que muestre el menú de login
            actualizarUIAutenticacion(); 
            // Opcional: Redirigir a la página de inicio
            window.location.href = 'index.html'; 
        });

        cerrarSesionLi.appendChild(cerrarSesionA);
        dropdownMenu.appendChild(cerrarSesionLi);

    } else {
        // --- El usuario NO ESTÁ autenticado ---
        // Creamos los items "Iniciar Sesión" y "Registrarse"
        const iniciarSesionLi = document.createElement('li');
        iniciarSesionLi.innerHTML = '<a href="iniciar-sesion.html">Iniciar Sesión</a>';

        const registrarseLi = document.createElement('li');
        registrarseLi.innerHTML = '<a href="registrarse.html">Registrarse</a>';
        
        dropdownMenu.appendChild(iniciarSesionLi);
        dropdownMenu.appendChild(registrarseLi);
    }
}