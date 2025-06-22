export function crearOpcionProveedor(proveedor) {
    const opcion = document.createElement('option');
    opcion.value = proveedor.idProveedor; // El valor de la opción será el ID
    opcion.textContent = proveedor.nombre; // El texto visible será el nombre
    return opcion;
}
