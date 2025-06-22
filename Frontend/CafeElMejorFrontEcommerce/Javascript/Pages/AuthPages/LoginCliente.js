import { AuthAdmin } from './AuthAdmin.js';

export function iniciarPaginaLogin() {
    // 1. Verificación de elementos del DOM de forma segura
    const formLogin = document.getElementById('formLogin');
    const errorElement = document.getElementById('errorLogin');
    const usuarioInput = document.getElementById('usuario');
    const passwordInput = document.getElementById('password');
    const submitBtn = formLogin?.querySelector('button[type="submit"]');

    // 2. Validación completa de elementos
    if (!formLogin || !errorElement || !usuarioInput || !passwordInput || !submitBtn) {
        console.error('Error: Elementos del formulario no encontrados. Verifica los IDs en tu HTML:',
            {
                formLogin: !!formLogin,
                errorElement: !!errorElement,
                usuarioInput: !!usuarioInput,
                passwordInput: !!passwordInput,
                submitBtn: !!submitBtn
            }
        );
        return;
    }

    // 3. Manejador de submit mejorado
    formLogin.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 4. Validación de campos
        if (!usuarioInput.value.trim() || !passwordInput.value.trim()) {
            mostrarError("Todos los campos son obligatorios");
            return;
        }

        try {
            // 5. Estado de carga
            submitBtn.disabled = true;
            submitBtn.textContent = 'Iniciando sesión...';

            // 6. Intento de login
            await AuthAdmin.loginCliente(usuarioInput.value, passwordInput.value);
            
            /*// 7. Redirección exitosa
            window.location.href = '/Frontend/CafeElMejorFrontEcommerce/HTML/productos.html';
            */
        } catch (error) {
            // 8. Manejo detallado de errores
            manejarErrorLogin(error);
        } finally {
            // 9. Restaurar estado del botón
            submitBtn.disabled = false;
            submitBtn.textContent = 'Iniciar sesión';
        }
    });

    // 10. Función para mostrar errores
    const mostrarError = (mensaje) => {
        errorElement.textContent = mensaje;
        errorElement.style.display = 'block';
        setTimeout(() => errorElement.style.display = 'none', 5000);
    };

    // 11. Función para manejar errores
    const manejarErrorLogin = (error) => {
        let mensaje = "Error en el login";
        
        if (error.response) {
            switch (error.response.status) {
                case 400: mensaje = "Datos inválidos"; break;
                case 401: mensaje = "Credenciales incorrectas"; break;
                case 500: mensaje = "Error del servidor"; break;
                default: mensaje = `Error ${error.response.status}`;
            }
            
            // Si el backend devuelve mensajes personalizados
            if (error.response.data?.message) {
                mensaje = error.response.data.message;
            }
        }
        
        mostrarError(mensaje);
    };

    // 12. Redirección si ya está autenticado
    /* if (AuthAdmin.estaAutenticado()) {
        window.location.href = '/Frontend/CafeElMejorFrontEcommerce/HTML/productos.html';
    }*/
}