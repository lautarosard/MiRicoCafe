const API_BASE = "https://localhost:7069/api/Cliente";

//Obtiene todos los Cliente
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
        console.error('Error al obtener Cliente: ', error);
        return [];
    }
}

//Obtiene un Cliente por id
export async function GetByClienteId(id){
    try{
        const response = await axios.get(`${API_BASE}/${id}`);
        return response.data;
        } catch (error){
            console.error('Error al obtener Cliente: ', error);
            throw error;
        }
}

//Crea un Cliente
export async function CreateCliente(Cliente) {
    try {
        //axios.post(URL, DATOS_A_ENVIAR)
        const response = await axios.post(API_BASE, Cliente);
        return response.data;
    } catch (error) {
        console.error("Error al crear Cliente:", error.response?.data || error);
        throw error;
    }
}

//Elimina un Cliente
export async function DeleteClienteId(id) {
    try {
        const response = await axios.delete(`${API_BASE}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar Cliente:', error.response?.data || error.message);
        throw error;
    }
}

//Updatea un Cliente
export async function UpdateCliente(id, ClienteActualizado) {
    try {
        const response = await axios.put(`${API_BASE}/${id}`, ClienteActualizado, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error al updatear al Cliente:", error);
        throw error;
    }
}