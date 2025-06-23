import { AuthAdmin } from './AuthAdmin.js';
import { actualizarUIAutenticacion } from './../../Components/uiUpdater.js';

export function iniciarPaginaLogin() {
    // 1. Selección segura de elementos con mensajes descriptivos
    const selectElement = (id) => {
        const element = document.getElementById(id);
        if (!element) console.error(`Elemento #${id} no encontrado en el DOM`);
        return element;
    };

    const formLogin = selectElement('formLogin');
    const errorElement = selectElement('errorLogin');
    const usuarioInput = selectElement('usuario');
    const passwordInput = selectElement('password');
    const submitBtn = formLogin?.querySelector('button[type="submit"]');

    // 2. Validación mejorada de elementos
    if (!formLogin || !errorElement || !usuarioInput || !passwordInput || !submitBtn) {
        console.error('Elementos faltantes:', {
            formLogin: !!formLogin,
            errorElement: !!errorElement,
            usuarioInput: !!usuarioInput,
            passwordInput: !!passwordInput,
            submitBtn: !!submitBtn
        });
        return;
    }

    // 3. Función para mostrar errores
    const mostrarError = (mensaje, duration = 5000) => {
        errorElement.textContent = mensaje;
        errorElement.style.display = 'block';
        setTimeout(() => {
            errorElement.style.display = 'none';
        }, duration);
    };

    // 4. Manejador de submit optimizado
    formLogin.addEventListener('submit', async (e) => {
        e.preventDefault();

        const usuario = usuarioInput.value.trim();
        const password = passwordInput.value.trim();

        // Validación mejorada con mensajes específicos
        if (!usuario && !password) {
            mostrarError('Usuario y contraseña son requeridos');
            return;
        }
        if (!usuario) {
            mostrarError('El campo Usuario es requerido');
            usuarioInput.focus();
            return;
        }
        if (!password) {
            mostrarError('El campo Contraseña es requerido');
            passwordInput.focus();
            return;
        }

        try {
            // Estado de carga
            submitBtn.disabled = true;
            submitBtn.textContent = 'Iniciando sesión...';

            // Intento de login
            const response = await AuthAdmin.loginCliente(usuario, password);
            localStorage.setItem("Rol", response.rol);             // Guardar rol
            // Verificación de respuesta
            if (!response?.token) {
                throw new Error('Respuesta inválida del servidor');
            }

            // --- ¡AQUÍ ESTÁ LA MAGIA! ---
            // 1. Actualizamos la UI inmediatamente
            actualizarUIAutenticacion();

            // 2. Avisamos al usuario y redirigimos
            alert('¡Inicio de sesión exitoso!');
           // window.location.href = 'index.html'; // O a la página de perfil, etc.


        } catch (error) {
            // Manejo detallado de errores
            let mensajeError = 'Error al iniciar sesión';
            
            if (error.response) {
                // Error de la API
                if (error.response.data?.errors) {
                    mensajeError = Object.values(error.response.data.errors)
                        .flat()
                        .join(', ');
                } else if (error.response.data?.title) {
                    mensajeError = error.response.data.title;
                } else if (error.response.status === 401) {
                    mensajeError = 'Credenciales incorrectas';
                }
            } else if (error.message) {
                // Error de red u otro
                mensajeError = error.message;
            }
            
            mostrarError(mensajeError);
            passwordInput.value = '';
            passwordInput.focus();
            
        } finally {
            // Restaurar estado del botón
            submitBtn.disabled = false;
            submitBtn.textContent = 'Iniciar sesión';
        }
    });

    // 5. Auto-foco en el primer campo al cargar
    usuarioInput.focus();
}