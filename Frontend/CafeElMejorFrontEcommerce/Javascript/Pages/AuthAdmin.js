import { Login, RegisterCliente } from './../../APIs/AuthApi.js';
import { VaciarCarrito } from './../../APIs/Carrito.js';

export const AuthAdmin = {
    
    async loginCliente(usuario, password) {
        try {
            const response = await Login(usuario, password);
            localStorage.setItem("token", response.token);         // Guardar el JWT
            localStorage.setItem("clienteId", response.usuarioId); // Guardar ID del cliente
            localStorage.setItem("username", response.username);   // Guardar nombre de usuario
            return response;
        } catch (error) {
            console.error("Error durante el login:", error);
            throw error;
        }
    },

    async registrarCliente(username, password, cliente) {
        try {
            const response = await RegisterCliente(username, password, cliente);
            return response;
        } catch (error) {
            console.error("Error durante el registro de cliente:", error);
            throw error;
        }
    },

    async cerrarSesion() {
        const clienteId = parseInt(localStorage.getItem("clienteId"), 10);

        try {
            if (!isNaN(clienteId)) {
                await VaciarCarrito(clienteId);
            }
        } catch (error) {
            console.warn("No se pudo vaciar el carrito al cerrar sesión:", error);
        }

        localStorage.removeItem("token");
        localStorage.removeItem("clienteId");
        localStorage.removeItem("username");

        // Redireccionar (opcional)
        window.location.href = "login.html"; // Cambiá esto por la ruta correcta si querés (den)
    },

    estaAutenticado() {
        return !!localStorage.getItem("token");
    }
};