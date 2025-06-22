const API_BASE = "https://localhost:7069/api/Auth";

// Login de usuario
export async function Login(usuario, password) {
    try {
        console.log('Login payload:', {
        Usuario: usuario,
        Password: password
        });
        const response = await axios.post(`${API_BASE}/login`, {
            Usuario: usuario,  // Asegúrate que estos nombres coincidan
            Password: password // con lo que espera tu backend
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        console.log('Enviando login:', { Usuario: usuario, Password: password });
        return response.data;
    } catch (error) {
        console.error("Error detallado:", {
            status: error.response?.status,
            data: error.response?.data,
            request: {
                url: error.config?.url,
                payload: JSON.parse(error.config?.data)
            }
        });
        throw error;
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
