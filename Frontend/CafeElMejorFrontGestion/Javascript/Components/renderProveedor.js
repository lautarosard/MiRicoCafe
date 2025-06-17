//renderProveedor, crear una tarjeta
export function crearTarjetaProveedor(Proveedor){
    const card = document.createElement('div');
    card.className = 'tarjeta-proveedor';

    card.innerHTML = 
    `
    <h3>${Proveedor.nombre}</h3>
    <p>Email: ${Proveedor.email}</p>`;

    return card;
}