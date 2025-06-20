

// TODO: Reemplaza esta URL por la dirección real de tu backend.
const API_BASE = "https://localhost:7069/api/Carrito"; 

// TODO: Este ID de cliente es temporal. Deberás obtenerlo dinámicamente
// cuando implementes el inicio de sesión de usuarios.
const CLIENTE_ID_TEMPORAL = 1;

const CarritoAPI = {
    /**
     * Obtiene todos los productos del carrito para un cliente específico.
     * Corresponde a: [HttpGet("{clienteId}")]
     * @returns {Promise<Array>} Una promesa que resuelve a un array de productos del carrito.
     */
    async get() {
        try {
            const response = await axios.get(`${API_BASE}/${CLIENTE_ID_TEMPORAL}`);
            // El controller devuelve un CarritoResponse, los items están dentro de una propiedad.
            // Ajusta 'items' si el nombre de la propiedad en tu CarritoResponse es diferente.
            return response.data?.items || [];
        } catch (error) {
            console.error('Error al obtener el carrito:', error);
            return []; // Devuelve un array vacío en caso de error para no romper la UI.
        }
    },

    /**
     * Agrega un producto al carrito de un cliente.
     * Corresponde a: [HttpPost("{clienteId}")]
     * @param {object} productoAAgregar - Contiene los detalles del producto a agregar.
     * @returns {Promise<void>}
     */
    async add(productoAAgregar) {
        // El backend espera un objeto ItemCarritoRequest. Lo construimos aquí.
        const requestBody = {
            productoId: productoAAgregar.id,
            cantidad: productoAAgregar.quantity
        };
        try {
            await axios.post(`${API_BASE}/${CLIENTE_ID_TEMPORAL}`, requestBody);
        } catch (error) {
            console.error("Error al agregar item al carrito:", error.response?.data || error);
            throw error; // Lanza el error para que el handler muestre una alerta.
        }
    },

    /**
     * Elimina un producto del carrito de un cliente.
     * Corresponde a: [HttpDelete("{clienteId}/{productoId}")]
     * @param {number} productoId - El ID del producto a eliminar.
     * @returns {Promise<void>}
     */
    async remove(productoId) {
        try {
            await axios.delete(`${API_BASE}/${CLIENTE_ID_TEMPORAL}/${productoId}`);
        } catch (error) {
            console.error('Error al eliminar item del carrito:', error.response?.data || error.message);
            throw error;
        }
    },

    /**
     * Actualiza la cantidad de un producto específico en el carrito.
     * Corresponde a: [HttpPut("{clienteId}/{productoId}")]
     * @param {number} productoId - El ID del producto a actualizar.
     * @param {number} nuevaCantidad - La nueva cantidad.
     * @returns {Promise<void>}
     */
    async updateQuantity(productoId, nuevaCantidad) {
        try {
            // El backend espera la cantidad directamente en el cuerpo de la petición.
            await axios.put(`${API_BASE}/${CLIENTE_ID_TEMPORAL}/${productoId}`, nuevaCantidad, {
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (error) {
            console.error('Error al actualizar la cantidad:', error.response?.data || error);
            throw error;
        }
    },

    /**
     * Vacía completamente el carrito de un cliente.
     * Corresponde a: [HttpDelete("{clienteId}")]
     * @returns {Promise<void>}
     */
    async empty() {
        try {
            await axios.delete(`${API_BASE}/${CLIENTE_ID_TEMPORAL}`);
        } catch (error) {
            console.error('Error al vaciar el carrito:', error.response?.data || error.message);
            throw error;
        }
    }
};

export default CarritoAPI;
