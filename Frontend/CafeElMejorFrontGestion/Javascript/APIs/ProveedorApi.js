//CONEXIÓN CON EL ENDPOINT DE PROVEEDORES
const API_BASE = "https://localhost:7069/api/Proveedor";

//Obtiene todos los proveedores
export async function GetAll(){
    try{
        const response = await axios.get(API_BASE);
        // Verifica que response.data existe y es un array
        if (!response.data || !Array.isArray(response.data)) {
            console.warn('La respuesta no contiene un array válido:', response);
            return [];
        }
        
        return response.data;
    } catch (error){
        console.error('Error al obtener proveedores: ', error);
        return [];
    }
}

//Obtiene un proveedor por id
export async function GetByProveedorId(id){
    try{
        const response = await axios.get(`${API_BASE}/${id}`);
        return response.data;
        } catch (error){
            console.error('Error al obtener proveedores: ', error);
            throw error;
        }
}

//Crea un proveedor
export async function CreateProveedor(proveedor) {
    try {
        //axios.post(URL, DATOS_A_ENVIAR)
        const response = await axios.post(API_BASE, proveedor);
        return response.data;
    } catch (error) {
        console.error("Error al crear proveedor:", error.response?.data || error);
        throw error;
    }
}

//Elimina un proveedor
export async function DeleteProveedorId(id) {
    try {
        const response = await axios.delete(`${API_BASE}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar proveedor:', error.response?.data || error.message);
        throw error;
    }
}

//Updatea un proveedor
export async function UpdateProveedor(id, proveedorActualizado) {
    try {
        const response = await axios.put(`${API_BASE}/${id}`, proveedorActualizado, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error al updatear al proveedor:", error);
        throw error;
    }
}
