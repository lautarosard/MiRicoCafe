export function crearTarjetaProveedor(Proveedor){
    const card = document.createElement('div');
    card.className = 'tarjeta-proveedor';

    card.innerHTML = 
    `<h3>${proveedor.nombre}</h3> <p>Email: ${proveedor.email}</p>`;

    return card;
}