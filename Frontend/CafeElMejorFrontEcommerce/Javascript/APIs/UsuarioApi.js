const API_BASE = "https://localhost:7069/api/Usuario";

//Obtiene todos los Usuario
export async function GetAll(){
    try{
        const response = await axios.get(API_BASE);
        // Verifica que response.data existe
        if (!response.data) {
            console.warn('La respuesta no es válido:', response);
            return [];
        }
        return response.data;
    
    } catch (error){
        console.error('Error al obtener Usuario: ', error);
        return [];
    }
}

//Obtiene un Usuario por id
export async function GetByUsuarioId(id){
    try{
        const response = await axios.get(`${API_BASE}/${id}`);
        return response.data;

        } catch (error){
            console.error('Error al obtener Usuario: ', error);
            throw error;
        }
}

//Elimina un Usuario
export async function DeleteUsuarioId(id) {
    try {
        const response = await axios.delete(`${API_BASE}/${id}`);
        return response.data;
        
    } catch (error) {
        console.error('Error al eliminar Usuario:', error.response?.data || error.message);
        throw error;
    }
}
