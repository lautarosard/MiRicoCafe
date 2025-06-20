/**
 * Este archivo simula una API para gestionar el carrito de compras,
 * preparándolo para una futura conexión a una base de datos real.
 * Los datos se guardan en memoria y se reinician al recargar la página.
 */

// Simulación de nuestra "base de datos" en memoria para el carrito.
// En un escenario real, esta variable no existiría en el frontend.
let _carritoEnMemoria = [];

// Simula la demora de una petición de red.
const simularDemora = (ms = 100) => new Promise(resolve => setTimeout(resolve, ms));

const CarritoAPI = {
    /**
     * Obtiene todos los productos del carrito.
     * En un futuro, haría una llamada a la API: GET /api/carrito
     * @returns {Promise<Array>} Una promesa que resuelve a un array de productos del carrito.
     */
    async get() {
        await simularDemora();
        // Devuelve una copia para evitar mutaciones directas del estado.
        return [..._carritoEnMemoria];
    },

    /**
     * Agrega un producto al carrito.
     * En un futuro, haría una llamada a la API: POST /api/carrito/agregar
     * @param {object} productoAAgregar - El objeto del producto a agregar.
     * @returns {Promise<Array>} El nuevo estado del carrito.
     */
    async add(productoAAgregar) {
        await simularDemora();
        const productoExistente = _carritoEnMemoria.find(p => p.id === productoAAgregar.id);

        if (productoExistente) {
            productoExistente.quantity += productoAAgregar.quantity;
        } else {
            _carritoEnMemoria.push(productoAAgregar);
        }
        
        // La API real devolvería el estado actualizado del carrito.
        return [..._carritoEnMemoria];
    },

    /**
     * Elimina un producto del carrito por su ID.
     * En un futuro, haría una llamada a la API: DELETE /api/carrito/{productoId}
     * @param {number} productoId - El ID del producto a eliminar.
     * @returns {Promise<Array>} El nuevo estado del carrito.
     */
    async remove(productoId) {
        await simularDemora();
        _carritoEnMemoria = _carritoEnMemoria.filter(p => p.id !== productoId);
        return [..._carritoEnMemoria];
    },

    /**
     * Actualiza la cantidad de un producto específico en el carrito.
     * En un futuro, haría una llamada a la API: PUT /api/carrito/actualizar
     * @param {number} productoId - El ID del producto a actualizar.
     * @param {number} nuevaCantidad - La nueva cantidad.
     * @returns {Promise<Array>} El nuevo estado del carrito.
     */
    async updateQuantity(productoId, nuevaCantidad) {
        await simularDemora();
        const productoIndex = _carritoEnMemoria.findIndex(p => p.id === productoId);

        if (productoIndex > -1) {
            if (nuevaCantidad < 1) {
                // Si la cantidad es 0 o menos, lo eliminamos.
                _carritoEnMemoria.splice(productoIndex, 1);
            } else {
                _carritoEnMemoria[productoIndex].quantity = nuevaCantidad;
            }
        }
        
        return [..._carritoEnMemoria];
    },

    /**
     * Vacía completamente el carrito.
     * En un futuro, haría una llamada a la API: DELETE /api/carrito/vaciar
     * @returns {Promise<Array>} Un array vacío que representa el carrito limpio.
     */
    async empty() {
        await simularDemora();
        _carritoEnMemoria = [];
        return [..._carritoEnMemoria];
    }
};

export default CarritoAPI;