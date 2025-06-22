const API_BASE = "https://localhost:7069/api/OC";

//Obtiene todos las OrdenDeCompra
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
        console.error('Error al obtener Orden de compra: ', error);
        return [];
    }
}

//Obtiene un OC por id
export async function GetByOrdenDeCompraId(id){
    try{
        const response = await axios.get(`${API_BASE}/${id}`);
        return response.data;
        } catch (error){
            console.error('Error al obtener Orden de compra: ', error);
            throw error;
        }
}

//Crea un Orden de compra
export async function CreateOrdenDeCompra(OC) {
    try {
        //axios.post(URL, DATOS_A_ENVIAR)
        const response = await axios.post(API_BASE, OC);
        return response.data;
    } catch (error) {
        console.error("Error al crear Orden de compra:", error.response?.data || error);
        throw error;
    }
}

//Elimina un Orden de compra
export async function DeleteOrdenDeCompraId(id) {
    try {
        const response = await axios.delete(`${API_BASE}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar Orden de compra:', error.response?.data || error.message);
        throw error;
    }
}

//Updatea un Cliente
export async function UpdateOrdenDeCompra(id, OrdenDeCompraActualizado) {
    try {
        const response = await axios.put(`${API_BASE}/${id}`, OrdenDeCompraActualizado, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error al updatear al Orden De Compra:", error);
        throw error;
    }
}

