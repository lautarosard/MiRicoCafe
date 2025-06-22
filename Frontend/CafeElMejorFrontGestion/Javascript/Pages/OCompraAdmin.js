import { GetAll as GetAllOC, CreateOrdenDeCompra } from './../APIs/OCompraApi.js';
import { crearFilaOC } from './../Components/LOCComponents/renderListadoOC.js';

async function cargarProductos() {
    try {
        const cuerpoTabla = document.querySelector('.tabla-productos tbody');
        cuerpoTabla.innerHTML = ''; // Limpiar tabla--

        const Ordenes = await GetAllOC();
        console.log("Ordenes:", Ordenes);
        if (Ordenes.length === 0) {
            const filaVacia = document.createElement('tr');
            filaVacia.innerHTML = '<td colspan="6">No hay Ordenes de Compra disponibles</td>';
            cuerpoTabla.appendChild(filaVacia);
            return;
        }

        const fragment = document.createDocumentFragment();
        Ordenes.forEach(OrdenDeCompra => {
            const fila = crearFilaOC(OrdenDeCompra);
            fragment.appendChild(fila);
        });

        cuerpoTabla.appendChild(fragment);

    } catch (error) {
        console.error('Error en cargarOrdenes:', error);

        const cuerpoTabla = document.querySelector('.tabla-productos tbody');
        const filaError = document.createElement('tr');
        filaError.innerHTML = '<td colspan="6">Error al cargar las ordenes</td>';
        cuerpoTabla.appendChild(filaError);
    }
}

function configurarFormularioCreacion() {
    const form = document.getElementById('form-producto');
    const mensaje = document.getElementById('mensaje');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const proveedor = {
            fecha: document.getElementById('addFecha').value,
            idOrdenDeCompra: document.getElementById('addidOrdenDeCompra').value,
            proveedor: document.getElementById('addProveedor').value,
            total: document.getElementById('addTotal').value,
        };

        try {
            const creado = await CreateOC(oc);
            mensaje.textContent = `OC creado con ID: ${creado.idOrdenDeCompra}`;
            form.reset();
            cargarProductos(); // recargar lista
        } catch (error) {
            mensaje.textContent = "Error al crear OC.";
            console.error(error);
        }
    });
}

export function iniciarPaginaLOCompra() {

     // 1. Carga la lista inicial de proveedores
    cargarProductos();

    // Le pasamos 'cargarProveedores' para que pueda recargar la lista después de agregar.
    configurarFormularioAgregar(cargarProductos); 
}