import { Login, RegisterCliente } from './../../APIs/AuthApi.js';

export const AuthAdmin = {
    
    async loginCliente(usuario, password) {
        try {
            const response = await Login(usuario, password);
            console.log("Login exitoso:", response);
            localStorage.setItem("token", response.token); // Guardar el JWT
            localStorage.setItem("clienteId", response.clienteId);
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

    // Añade este método a tu objeto AuthAdmin
    cerrarSesion() {
        localStorage.removeItem("token");
        localStorage.removeItem("clienteId");
        localStorage.removeItem("username");
        
    },

    estaAutenticado() {
        return !!localStorage.getItem("token");
    }
};
