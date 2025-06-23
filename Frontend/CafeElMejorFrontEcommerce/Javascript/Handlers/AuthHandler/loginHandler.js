import { Login } from './../../APIs/AuthApi.js';

document.getElementById('formLogin').addEventListener('submit', async (e) => {
    e.preventDefault();

    const usuario = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;

    try {
        const response = await Login(usuario, password);
        console.log("Login exitoso:", response);
        // Guardar token si lo devuelve
        localStorage.setItem('token', response.token);
        // Redireccionar si es necesario
    } catch (error) {
        alert("Error en login: " + (error.response?.data?.message || "Intente nuevamente."));
    }
});

