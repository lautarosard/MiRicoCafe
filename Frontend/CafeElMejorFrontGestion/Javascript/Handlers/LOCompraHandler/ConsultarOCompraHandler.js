export function abrirModalVerOCompra(OC) {
    const modal = document.getElementById('modalVerOC');
    const contenido = document.getElementById('detallesOCContenido');

    if (modal && contenido) {
        contenido.innerHTML = `
            <p><strong>Número de orden de compra:</strong> ${OC.Id}</p>
            <p><strong>Fecha de Emisión:</strong> ${new Date(OC.Fecha + 'T00:00:00').toLocaleDateString('es-AR')}</p>
            <p><strong>Proveedor:</strong> ${OC.Proveedor}</p>
            <hr>
            <p><strong>Total:</strong> ${(OC.total)}</p>
        `;
        modal.style.display = 'flex';
    } else {
        console.error("No se encontraron los elementos del modal para ver orden de compra.");
    }
}

export function configurarCierreModalVer() {
    const botonCerrar = document.getElementById('cerrarModalVer');
    const modal = document.getElementById('modalVerOC');

    if (botonCerrar && modal) {
        botonCerrar.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
}
