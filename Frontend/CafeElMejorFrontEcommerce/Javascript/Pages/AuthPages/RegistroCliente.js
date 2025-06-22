import { AuthAdmin } from './AuthAdmin.js';

export function iniciarPaginaRegistro() {
    const formRegistro = document.getElementById('formRegistro');
    if (!formRegistro) {
        console.error('No se encontró el formulario de registro');
        return;
    }
    const errorElement = document.getElementById('errorRegistro');

    formRegistro.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Obtener valores del formulario
        const username = document.getElementById('usuario').value;
        const password = document.getElementById('contraseña').value;
        const nombre = document.getElementById('nombre').value;
        const dni = document.getElementById('dni').value;
        const email = document.getElementById('mail').value;

        // Validación básica
        if (!username || !password || !nombre || !dni || !email) {
            mostrarError("Todos los campos son obligatorios");
            return;
        }

        // Crear objeto cliente
        const cliente = {
            nombre: nombre,
            dni: dni,
            email: email
        };

        try {
            await AuthAdmin.registrarCliente(username, password, cliente);
            mostrarExito("Registro exitoso! Serás redirigido al login.");
            setTimeout(() => window.location.href = 'iniciar-sesion.html', 2000);
        } catch (error) {
            mostrarError(error.response?.data?.message || "Error en el registro. Intente nuevamente.");
        }
    });

    function mostrarError(mensaje) {
        errorElement.textContent = mensaje;
        errorElement.style.display = 'flex';
    }

    function mostrarExito(mensaje) {
        // Puedes implementar un modal o toast de éxito
        alert(mensaje); // Temporal - luego puedes mejorarlo
    }
}