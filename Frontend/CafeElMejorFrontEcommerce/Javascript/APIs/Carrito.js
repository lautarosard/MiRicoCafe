const API_BASE = "https://localhost:7069/api/Carrito";



export async function ObtenerCarrito(clienteId) {
    if (!clienteId) {
        return []; // No hay sesión → no hay carrito
    }

    try {
        const response = await axios.get(`${API_BASE}/${clienteId}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener carrito:", error);
        return [];
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
            headers: { "Content-Type": "application/json" }
        });
        return response.data;
    } catch (error) {
        console.error("Error al actualizar cantidad en el carrito:", error);
        throw error;
    }
}

export async function EliminarItemDelCarrito(clienteId, productoId) {
    try {
        const response = await axios.delete(`https://localhost:7069/api/Carrito/${clienteId}/${productoId}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar item del carrito:', error);
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