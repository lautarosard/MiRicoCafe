const API_BASE = "https://localhost:7069/api/Factura";

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
        console.error('Error al obtener productos: ', error);
        return [];
    }
}

//Obtiene un Producto por id
export async function GetByFacturaId(id){
    try{
        const response = await axios.get(`${API_BASE}/${id}`);
        return response.data;
        } catch (error){
            console.error('Error al obtener facturas: ', error);
            throw error;
        }
}

//Crea un Producto
export async function CreateFactura(factura) {
    try {
        //axios.post(URL, DATOS_A_ENVIAR)
        const response = await axios.post(API_BASE, factura);
        return response.data;
    } catch (error) {
        console.error("Error al crear Factura:", error.response?.data || error);
        throw error;
    }
}
