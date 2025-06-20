const API_BASE = "https://localhost:7069/api/Producto";

//Obtiene todos los productos
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
export async function GetByProductoId(id){
    try{
        const response = await axios.get(`${API_BASE}/${id}`);
        return response.data;
        } catch (error){
            console.error('Error al obtener productos: ', error);
            throw error;
        }
}

//Crea un Producto
export async function CreateProducto(producto) {
    try {
        //axios.post(URL, DATOS_A_ENVIAR)
        const response = await axios.post(API_BASE, producto);
        return response.data;
    } catch (error) {
        console.error("Error al crear Producto:", error.response?.data || error);
        throw error;
    }
}

//Elimina un Producto
export async function DeleteProductoId(id) {
    try {
        const response = await axios.delete(`${API_BASE}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar Producto:', error.response?.data || error.message);
        throw error;
    }
}

//Updatea un Producto
export async function UpdateProducto(id, productoActualizado) {
    try {
        const response = await axios.put(`${API_BASE}/${id}`, productoActualizado, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error al updatear al producto:", error);
        throw error;
    }
}
