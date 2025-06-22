import { Login, RegisterCliente } from './../../APIs/AuthApi.js';

export const AuthAdmin = {
    
    async loginCliente(usuario, password) {
        try {
            const response = await Login(usuario, password);
            localStorage.setItem("token", response.token); // Guardar el JWT
            localStorage.setItem("usuarioId", response.usuarioId);
            localStorage.setItem("username", response.username);
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

    cerrarSesion() {
        localStorage.removeItem("token");
        localStorage.removeItem("usuarioId");
        localStorage.removeItem("username");
    },

    estaAutenticado() {
        return !!localStorage.getItem("token");
    }
};
