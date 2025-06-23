import { Login, RegisterCliente } from './../../APIs/AuthApi.js';
import { VaciarCarrito } from './../../APIs/Carrito.js';


function parseJwt(token) {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        // Si el token es inválido o no se puede decodificar, devuelve null.
        return null;
    }
}

export const AuthAdmin = {
    
    async loginCliente(usuario, password) {
        try {
            const response = await Login(usuario, password);
            console.log("Login exitoso:", response);
            localStorage.setItem("token", response.token);         // Guardar el JWT
            localStorage.setItem("clienteId", response.clienteId); // Guardar ID del cliente
            localStorage.setItem("username", response.username);   // Guardar nombre de usuario
            
            // --- INICIO DE CÓDIGO NUEVO ---
            
            // NUEVO: Llamamos a nuestra función para decodificar el token y leer los datos de adentro.
            const decodedToken = parseJwt(response.token);

            // // NUEVO: Buscamos el rol dentro del token decodificado. El nombre del campo puede variar (ej: 'role', 'rol', etc.).
            // // Este código intenta encontrar el rol usando los nombres más comunes. AJÚSTALO si tu backend usa un nombre diferente.
            const userRole = decodedToken.Rol || decodedToken.rol;
            
            // NUEVO: Si encontramos un rol en el token, lo guardamos en el localStorage para usarlo en toda la web.
            if (userRole) {
                localStorage.setItem("userRole", userRole);
            }
            
            // // --- FIN DE CÓDIGO NUEVO ---
            
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
        // NUEVO: Es crucial borrar también el rol guardado cuando el usuario cierra la sesión.
        localStorage.removeItem("rol"); 

        // Redireccionar (opcional)
        //window.location.href = "login.html"; // Cambiá esto por la ruta correcta si querés
    },

    estaAutenticado() {
        return !!localStorage.getItem("token");
    },

    obtenerRol() {
        return localStorage.getItem("userRole");
    }
};