import { AuthAdmin } from './../Pages/AuthPages/AuthAdmin.js';

export function actualizarUIAutenticacion() {
    console.log('entre a actualizarUIAutenticacion');
    const dropdownMenu = document.getElementById('user-dropdown-menu');
    const mainMenuNav = document.querySelector('.menu-principal ul'); 
    if (!dropdownMenu || !mainMenuNav ) return; // Si no encuentra el menú, no hace nada

    const existingGestionLink = document.getElementById('gestion-link');
    // NUEVO: Si existe, lo eliminamos. Esto previene que se añadan links duplicados si la función se llama varias veces.
    if (existingGestionLink) {
        existingGestionLink.remove();
    }

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

        // --- INICIO DE CÓDIGO NUEVO ---
        //AuthAdmin.obtenerRol();
        const userRole = localStorage.Rol
        
        // NUEVO: Comparamos si el rol obtenido es exactamente 'Admin'.
        if (userRole?.toLowerCase() === 'admin') {
            console.log('El rol obtenido .', userRole);
            // NUEVO: Creamos un nuevo elemento de lista <li> para nuestro link.
            
            window.location.replace("./../../../../CafeElMejorFrontGestion/HTML/index.html");

            //./../../../../CafeElMejorFrontGestion/HTML/index.html
            // // NUEVO: Le asignamos un ID para poder encontrarlo y borrarlo fácilmente al inicio de la función.
            // gestionLi.id = 'gestion-link';
            // // NUEVO: Creamos el enlace <a> que redirige a la página de gestión.
            // gestionLi.innerHTML = `<a href="./../../../CafeElMejorFrontGestion/">Gestion</a>`;
            // // NUEVO: Añadimos el nuevo elemento <li> al final del menú de navegación principal.
            // mainMenuNav.appendChild(gestionLi);
        }
        // --- FIN DE CÓDIGO NUEVO ---


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