
// TODO: Reemplaza esta URL por la dirección real de tu backend.
const API_BASE = "https://localhost:7069/api/Carrito"; 

// TODO: Este ID de cliente es temporal. Deberás obtenerlo dinámicamente
// cuando implementes el inicio de sesión de usuarios.
const CLIENTE_ID_TEMPORAL = 1;


export async function ObtenerCarrito(clienteId) {
    try {
        const response = await axios.get(`${API_BASE}/Factura/${clienteId}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener la factura ${clienteId}:`, error);
        throw error; // Lanzamos el error para que el handler pueda capturarlo.
    }
}

export async function AgregarItemAlCarrito(clienteId, productoId, cantidad) {
    try {
        const response = await axios.post(`${API_BASE}/${clienteId}`, {
            productoId,
            cantidad
        });
        return response.data;
    } catch (error) {
        console.error("Error al agregar ítem al carrito:", error);
        throw error;
    }
}

export async function ActualizarCantidadEnCarrito(clienteId, productoId, cantidad) {
    try {
        const response = await axios.put(`${API_BASE}/${clienteId}/${productoId}`, cantidad, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error al actualizar cantidad en el carrito:", error);
        throw error;
    }
}

export async function EliminarItemDelCarrito(clienteId, productoId) {
    try {
        const response = await axios.delete(`${API_BASE}/${clienteId}/${productoId}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar producto del carrito:", error);
        throw error;
    }
}

export async function VaciarCarrito(clienteId) {
    try {
        const response = await axios.delete(`${API_BASE}/${clienteId}`);
        return response.data;
    } catch (error) {
        console.error("Error al vaciar el carrito:", error);
        throw error;
    }
}
