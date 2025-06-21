// TODO: Cuando tengas tu backend, reemplaza esta URL por la correcta.
const API_BASE = "https://localhost:7069/api/Factura"; 


export async function GetAll() {
    try {
        const response = await axios.get(API_BASE);
        // Si la respuesta es exitosa pero no devuelve un array, devolvemos uno vacío para evitar errores.
        if (response.data && Array.isArray(response.data)) {
            return response.data;
        } else {
            console.warn('La respuesta de la API no contenía un array de facturas:', response);
            return [];
        }
    } catch (error) {
        console.error('Error al obtener las facturas:', error);
        // En caso de error, devolvemos un array vacío para que la UI no se rompa.
        return []; 
    }
}

export async function GetByFacturaId(id) {
    try {
        const response = await axios.get(${API_BASE}/Factura/${id});
        return response.data;
    } catch (error) {
        console.error('Error al obtener la factura' ${id}:, error);
        throw error; // Lanzamos el error para que el handler pueda capturarlo.
    }
}

export async function CreateFactura(nuevaFactura) {
    try {
        const response = await axios.post(API_BASE, nuevaFactura);
        return response.data;
    } catch (error) {
        console.error("Error al crear la factura:", error.response?.data || error);
        throw error; // Lanzamos el error para que el handler lo maneje.
    }
}