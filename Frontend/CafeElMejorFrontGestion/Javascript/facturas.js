document.addEventListener('DOMContentLoaded', () => {

    // --- SELECTORES DEL DOM ---
    const tablaBody = document.querySelector('.tabla-facturas tbody');
    const botonNuevaFactura = document.querySelector('.cabecera-seccion .nuevo');
    const inputBuscar = document.getElementById('buscar');
    const botonBuscar = document.querySelector('.opciones-facturas .nuevo');
    const modalNuevaFactura = document.getElementById('modalNuevaFactura');
    const modalVerFactura = document.getElementById('modalVerFactura');
    const formNuevaFactura = document.getElementById('formNuevaFactura');
    const detallesFacturaContenido = document.getElementById('detallesFacturaContenido');
    const cerrarModalNueva = document.getElementById('cerrarModalNueva');
    const cerrarModalVer = document.getElementById('cerrarModalVer');
    const inputImporte = document.getElementById('nuevoImporte');
    const inputIva = document.getElementById('nuevoIva');
    const inputTotal = document.getElementById('nuevoTotal');

    // --- FUNCIONES DE LA UI ---

    const formatearMoneda = (numero) => numero.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });

    const renderizarTabla = (facturas) => {
        tablaBody.innerHTML = '';
        if (facturas.length === 0) {
            tablaBody.innerHTML = '<tr><td colspan="8">No se encontraron facturas.</td></tr>';
            return;
        }
        facturas.forEach(factura => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${factura.numero}</td>
                <td>${new Date(factura.fecha + 'T00:00:00').toLocaleDateString('es-AR')}</td>
                <td>${factura.cuitCliente}</td>
                <td>${factura.nombreCliente}</td>
                <td>${formatearMoneda(factura.importe)}</td>
                <td>${formatearMoneda(factura.iva)}</td>
                <td>${formatearMoneda(factura.total)}</td>
                <td class="actions">
                    <button class="view" title="Ver" data-numero="${factura.numero}">👁️</button>
                </td>
            `;
            tablaBody.appendChild(fila);
        });
    };

    const abrirModal = (modal) => { if(modal) modal.style.display = 'flex'; };
    const cerrarModal = (modal) => { if(modal) modal.style.display = 'none'; };

    // --- LÓGICA DE EVENTOS (AHORA ASÍNCRONA) ---

    botonNuevaFactura.addEventListener('click', () => {
        formNuevaFactura.reset();
        abrirModal(modalNuevaFactura);
    });

    inputImporte.addEventListener('input', () => {
        const importe = parseFloat(inputImporte.value) || 0;
        const iva = importe * 0.21;
        const total = importe + iva;
        inputIva.value = iva.toFixed(2);
        inputTotal.value = total.toFixed(2);
    });
    
    // REGISTRAR: Ahora es una función asíncrona
    formNuevaFactura.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nuevaFactura = {
            numero: document.getElementById('nuevoNumero').value,
            fecha: document.getElementById('nuevoFecha').value,
            cuitCliente: document.getElementById('nuevoCuit').value,
            nombreCliente: document.getElementById('nuevoNombre').value,
            importe: parseFloat(document.getElementById('nuevoImporte').value),
            iva: parseFloat(document.getElementById('nuevoIva').value),
            total: parseFloat(document.getElementById('nuevoTotal').value)
        };

        try {
            await apiFacturas.create(nuevaFactura); // Llama a la API simulada
            cerrarModal(modalNuevaFactura);
            // Vuelve a pedir todas las facturas para refrescar la tabla
            const facturasActualizadas = await apiFacturas.getAll();
            renderizarTabla(facturasActualizadas);
        } catch (error) {
            console.error("Error al crear factura:", error);
            alert("No se pudo registrar la factura.");
        }
    });

    // CONSULTA: Ver detalles
    tablaBody.addEventListener('click', async (e) => {
        if (e.target.classList.contains('view')) {
            const numeroFactura = e.target.dataset.numero;
            // Podríamos volver a llamar a la API para obtener el detalle,
            // pero por eficiencia, lo buscamos en los datos ya cargados.
            const todasLasFacturas = await apiFacturas.getAll();
            const factura = todasLasFacturas.find(f => f.numero === numeroFactura);

            if (factura) {
                detallesFacturaContenido.innerHTML = `
                    <p><strong>Número:</strong> ${factura.numero}</p>
                    <p><strong>Fecha:</strong> ${new Date(factura.fecha + 'T00:00:00').toLocaleDateString('es-AR')}</p>
                    <p><strong>Cliente:</strong> ${factura.nombreCliente}</p>
                    <p><strong>CUIT:</strong> ${factura.cuitCliente}</p>
                    <hr>
                    <p><strong>Importe Neto:</strong> ${formatearMoneda(factura.importe)}</p>
                    <p><strong>IVA (21%):</strong> ${formatearMoneda(factura.iva)}</p>
                    <p><strong>Total Facturado:</strong> ${formatearMoneda(factura.total)}</p>
                `;
                abrirModal(modalVerFactura);
            }
        }
    });

    // CONSULTA: Búsqueda
    const realizarBusqueda = async () => {
        const terminoBusqueda = inputBuscar.value.toLowerCase().trim();
        const todasLasFacturas = await apiFacturas.getAll(); // Siempre busca sobre el total de datos

        if (terminoBusqueda === '') {
            renderizarTabla(todasLasFacturas);
        } else {
            const facturasFiltradas = todasLasFacturas.filter(f => f.numero.toLowerCase().includes(terminoBusqueda));
            renderizarTabla(facturasFiltradas);
        }
    };
    botonBuscar.addEventListener('click', realizarBusqueda);
    inputBuscar.addEventListener('keyup', (e) => { if(e.key === 'Enter') realizarBusqueda(); });

    // Cierre de modales
    cerrarModalNueva.addEventListener('click', () => cerrarModal(modalNuevaFactura));
    cerrarModalVer.addEventListener('click', () => cerrarModal(modalVerFactura));
    window.addEventListener('click', (e) => {
        if (e.target === modalNuevaFactura) cerrarModal(modalNuevaFactura);
        if (e.target === modalVerFactura) cerrarModal(modalVerFactura);
    });

    // --- INICIALIZACIÓN DE LA APLICACIÓN ---
    const iniciarApp = async () => {
        try {
            const todasLasFacturas = await apiFacturas.getAll();
            renderizarTabla(todasLasFacturas);
        } catch (error) {
            console.error("Error al iniciar la aplicación:", error);
            tablaBody.innerHTML = '<tr><td colspan="8">Error al cargar los datos. Intente más tarde.</td></tr>';
        }
    };
    
    iniciarApp(); // Llama a la función principal para empezar.
});