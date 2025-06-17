//CONEXIÓN CON EL ENDPOINT DE PROVEEDORES

const API_BASE = "https://localhost:7069/api";

export async function obtenerProveedores(){
    try{
        const response = await axios.get(`${API_BASE}/Proveedor`);
        return response
    } catch (error){
        console.error('Error al obtener proveedores: ', error);
        return [];
    }
}
