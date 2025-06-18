// js/main.js

import { GetAll } from './APIs/ProveedorApi.js';
import { crearTarjetaProveedor } from './Components/renderProveedor.js';
import { CreateProveedor } from './APIs/ProveedorApi.js';
import { configurarFormularioEditar } from './Handlers/EditarProveedorHandler.js';

// Cargar todos los proveedores y renderizarlos
async function cargarProveedores() {
    try {
        const contenedor = document.getElementById('contenedor-proveedores');
        contenedor.innerHTML = ''; // Limpiar antes de agregar

        const proveedores = await GetAll();

        if (proveedores.length === 0) {
            contenedor.innerHTML = '<p class="mensaje-vacio">No hay proveedores disponibles</p>';
            return;
        }

        const fragment = document.createDocumentFragment();
        proveedores.forEach(proveedor => {
            const tarjeta = crearTarjetaProveedor(proveedor);
            fragment.appendChild(tarjeta);
        });

        contenedor.appendChild(fragment);

    } catch (error) {
        console.error('Error en cargarProveedores:', error);
        const contenedor = document.getElementById('contenedor-proveedores');
        contenedor.innerHTML = '<p class="mensaje-error">Error al cargar los proveedores</p>';
    }
}

// Cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // POST Proveedor
    const form = document.getElementById('form-proveedor');
    const mensaje = document.getElementById('mensaje');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const proveedor = {
                nombre: document.getElementById('nombre').value,
                email: document.getElementById('email').value,
                tel: document.getElementById('telefono').value,
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

    // Editar
    configurarFormularioEditar();

    // Inicialmente cargar todos los proveedores
    cargarProveedores();
});
