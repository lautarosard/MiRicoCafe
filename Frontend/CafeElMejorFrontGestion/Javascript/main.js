import { GetAll, CreateProveedor } from './APIs/ProveedorApi.js';
import { crearFilaProveedor } from './Components/renderProveedor.js';
import { configurarFormularioEditar } from './Handlers/EditarProveedorHandler.js';

async function cargarProveedores() {
    try {
        const cuerpoTabla = document.querySelector('.tabla-proveedores tbody');
        cuerpoTabla.innerHTML = ''; // Limpiar tabla

        const proveedores = await GetAll();

        if (proveedores.length === 0) {
            const filaVacia = document.createElement('tr');
            filaVacia.innerHTML = '<td colspan="6">No hay proveedores disponibles</td>';
            cuerpoTabla.appendChild(filaVacia);
            return;
        }

        const fragment = document.createDocumentFragment();
        proveedores.forEach(proveedor => {
            const fila = crearFilaProveedor(proveedor);
            fragment.appendChild(fila);
        });

        cuerpoTabla.appendChild(fragment);

    } catch (error) {
        console.error('Error en cargarProveedores:', error);

        const cuerpoTabla = document.querySelector('.tabla-proveedores tbody');
        const filaError = document.createElement('tr');
        filaError.innerHTML = '<td colspan="6">Error al cargar los proveedores</td>';
        cuerpoTabla.appendChild(filaError);
    }
}

function configurarFormularioCreacion() {
    const form = document.getElementById('form-proveedor');
    const mensaje = document.getElementById('mensaje');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const proveedor = {
            nombre: document.getElementById('nombre').value,
            email: document.getElementById('email').value,
            telefono: document.getElementById('telefono').value,
            provincia: document.getElementById('provincia').value,
            localidad: document.getElementById('localidad').value,
            direccion: document.getElementById('direccion').value,
            cuit: document.getElementById('cuit').value
        };

        try {
            const creado = await CreateProveedor(proveedor);
            mensaje.textContent = `Proveedor creado con ID: ${creado.idProveedor}`;
            form.reset();
            cargarProveedores(); // recargar lista
        } catch (error) {
            mensaje.textContent = "Error al crear proveedor.";
            console.error(error);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    configurarFormularioEditar();
    configurarFormularioCreacion();
    cargarProveedores();
})
