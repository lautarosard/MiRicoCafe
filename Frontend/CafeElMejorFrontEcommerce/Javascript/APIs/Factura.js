const API_BASE = "https://localhost:7069/api/Factura"; 

export async function GetAll() {
    try {
        const response = await axios.get(API_BASE);
        return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
        console.error('Error al obtener las facturas:', error);
        return []; 
    }
}

export async function GetByFacturaId(clienteId) {
    try {
        const response = await axios.get(`${API_BASE}/${clienteId}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener la factura de cliente ${clienteId}:`, error);
        throw error;
    }
}

export async function CreateFactura(nuevaFactura) {
    try {
        const response = await axios.post(API_BASE, nuevaFactura);
        return response.data;
    } catch (error) {
        console.error("Error al crear la factura:", error.response?.data || error);
        throw error;
    }
}