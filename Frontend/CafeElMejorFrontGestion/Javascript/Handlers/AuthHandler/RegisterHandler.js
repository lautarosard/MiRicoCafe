import { RegisterCliente } from './../../APIs/AuthApi.js';

document.getElementById('formRegistro').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;

    const cliente = {
        
        usuario: document.getElementById('usuario').value,
        contrasena: document.getElementById('password').value,    
        nombre: document.getElementById('nombre').value,
        dni: document.getElementById('dni').value,
        email: document.getElementById('mail').value
        
    };

    try {
        const response = await RegisterCliente(username, password, cliente);
        alert("Registro exitoso: " + response.message);
    } catch (error) {
        alert("Error al registrar cliente: " + (error.response?.data?.message || "Intente nuevamente."));
    }
});
