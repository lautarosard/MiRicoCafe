const API_BASE = "https://localhost:7069/api/Auth";

// Login de usuario
export async function Login(usuario, password) {
    try {
        const response = await axios.post(`${API_BASE}/login`, {
            usuario: usuario,
            password: password
        });

        return response.data; // Esto debería contener el token JWT
    } catch (error) {
        console.error('Error en login:', error.response?.data || error);
        throw error; // para que el handler lo maneje
    }
}

// Registro de cliente
export async function RegisterCliente(username, password, cliente) {
    const data = {
        username: username,
        password: password,
        cliente: cliente
    };

    try {
        const response = await axios.post(`${API_BASE}/register-cliente`, data);
        return response.data;
    } catch (error) {
        console.error('Error en registro:', error.response?.data || error);
        throw error;
    }
}
