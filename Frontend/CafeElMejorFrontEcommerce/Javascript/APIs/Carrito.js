const CLAVE_CARRITO = 'cartProducts';

const CarritoAPI = {
    async get() {
        const productosString = localStorage.getItem(CLAVE_CARRITO);
        return JSON.parse(productosString) || [];
    },
    async save(productos) {
        localStorage.setItem(CLAVE_CARRITO, JSON.stringify(productos));
    },
    async add(productoAAgregar) {
        const carritoActual = await this.get();
        const productoExistente = carritoActual.find(p => p.id === productoAAgregar.id);
        if (productoExistente) {
            productoExistente.quantity += productoAAgregar.quantity;
        } else {
            carritoActual.push(productoAAgregar);
        }
        await this.save(carritoActual);
    },
    async remove(productoId) {
        let carritoActual = await this.get();
        carritoActual = carritoActual.filter(p => p.id !== productoId);
        await this.save(carritoActual);
    },
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
    },
    async empty() {
        await this.save([]);
    }
};
export default CarritoAPI;