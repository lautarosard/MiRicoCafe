const API_BASE = "https://localhost:7069/api/OC";


// Obtiene todas las Ordenes de Compra
export async function GetAll() {
    try {
        const response = await axios.get(API_BASE);

        if (!response.data || !Array.isArray(response.data)) {
            console.warn('La respuesta no contiene un array válido:', response);
            return [];
        }

        return response.data;
    } catch (error) {
        console.error('Error al obtener Ordenes de compra:', error);

        return [];
    }
}


// Obtiene una Orden de Compra por ID
export async function GetByOrdenDeCompraId(id) {
    try {
        const response = await axios.get(`${API_BASE}/OrdenDeCompra/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener Orden de compra ID ${id}:`, error);
        throw error;
    }
}

// Crea una Orden de Compra
export async function CreateOrdenDeCompra(orden) {
    try {
        const response = await axios.post(API_BASE, orden);

        return response.data;
    } catch (error) {
        console.error("Error al crear Orden de compra:", error.response?.data || error);
        throw error;
    }
}


// Elimina una Orden de Compra
export async function DeleteOrdenDeCompraId(id) {
    try {
        const response = await axios.delete(`${API_BASE}/OrdenDeCompradelete/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al eliminar Orden de compra ID ${id}:`, error.response?.data || error.message);

        throw error;
    }
}


// Actualiza una Orden de Compra
export async function UpdateOrdenDeCompra(id, ordenActualizada) {
    try {
        const response = await axios.put(`${API_BASE}/OrdenDeCompraupdate/${id}`, ordenActualizada, {

            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error(`Error al actualizar Orden de compra ID ${id}:`, error);

        throw error;
    }
}


// Elimina un producto de una orden de compra
export async function BorrarProductoDeOrden(idOrden, idProducto) {
    try {
        const response = await axios.put(`${API_BASE}/BorrarItem/${idOrden}?idProducto=${idProducto}`);
        return response.data;
    } catch (error) {
        console.error(`Error al borrar producto ${idProducto} de orden ${idOrden}:`, error);
        throw error;
    }
}

