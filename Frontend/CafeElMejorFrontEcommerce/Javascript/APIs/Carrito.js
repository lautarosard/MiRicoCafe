/**
 * Este archivo simula una API para gestionar el carrito de compras.
 * USA LOCALSTORAGE para simular una base de datos persistente
 * y que el carrito no se borre al cambiar de página.
 * * Cuando conectes un backend real, solo necesitarás modificar este archivo.
 */

const CLAVE_CARRITO = 'cartProducts'; // Clave para guardar los productos en localStorage

const CarritoAPI = {
    /**
     * Obtiene todos los productos del carrito desde localStorage.
     * @returns {Promise<Array>} Una promesa que resuelve a un array de productos del carrito.
     */
    async get() {
        // console.log("API: Obteniendo productos del carrito desde localStorage...");
        const productosString = localStorage.getItem(CLAVE_CARRITO);
        // Espera un momento para simular una llamada de red.
        await new Promise(resolve => setTimeout(resolve, 50)); 
        return JSON.parse(productosString) || [];
    },

    /**
     * Guarda el estado completo del carrito en localStorage.
     * @param {Array} productos - El array completo de productos a guardar.
     * @returns {Promise<void>}
     */
    async save(productos) {
        // console.log("API: Guardando carrito en localStorage...", productos);
        localStorage.setItem(CLAVE_CARRITO, JSON.stringify(productos));
        await new Promise(resolve => setTimeout(resolve, 50));
    },

    /**
     * Agrega un producto al carrito. Si ya existe, actualiza su cantidad.
     * @param {object} productoAAgregar - El objeto del producto a agregar.
     * @returns {Promise<Array>} El nuevo estado del carrito.
     */
    async add(productoAAgregar) {
        const carritoActual = await this.get();
        const productoExistente = carritoActual.find(p => p.id === productoAAgregar.id);

        if (productoExistente) {
            productoExistente.quantity += productoAAgregar.quantity;
        } else {
            carritoActual.push(productoAAgregar);
        }

        await this.save(carritoActual);
        return carritoActual;
    },

    /**
     * Elimina un producto del carrito por su ID.
     * @param {number} productoId - El ID del producto a eliminar.
     * @returns {Promise<Array>} El nuevo estado del carrito.
     */
    async remove(productoId) {
        let carritoActual = await this.get();
        carritoActual = carritoActual.filter(p => p.id !== productoId);
        await this.save(carritoActual);
        return carritoActual;
    },

    /**
     * Actualiza la cantidad de un producto específico en el carrito.
     * @param {number} productoId - El ID del producto a actualizar.
     * @param {number} nuevaCantidad - La nueva cantidad.
     * @returns {Promise<Array>} El nuevo estado del carrito.
     */
    async updateQuantity(productoId, nuevaCantidad) {
        let carritoActual = await this.get();
        const productoIndex = carritoActual.findIndex(p => p.id === productoId);

        if (productoIndex > -1) {
            if (nuevaCantidad < 1) {
                carritoActual.splice(productoIndex, 1);
            } else {
                carritoActual[productoIndex].quantity = nuevaCantidad;
            }
        }
        
        await this.save(carritoActual);
        return carritoActual;
    },

    /**
     * Vacía completamente el carrito.
     * @returns {Promise<Array>} Un array vacío.
     */
    async empty() {
        await this.save([]);
        return [];
    }
};

export default CarritoAPI;
