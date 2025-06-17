//CONEXIÓN CON EL ENDPOINT DE PROVEEDORES

const API_BASE = "https://localhost:7069/api";

export async function GetAll(){
    try{
        const response = await axios.get(`${API_BASE}/Proveedor`);
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
