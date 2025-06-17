// js/main.js

import { GetAll } from './APIs/ProveedorApi.js';
import { crearTarjetaProveedor } from './Components/renderProveedor.js';

async function cargarProveedores() {
    try {
        const contenedor = document.getElementById('contenedor-proveedores');
        
        // Limpiar contenedor antes de agregar nuevos elementos
        contenedor.innerHTML = '';
        
        const proveedores = await GetAll();
        
        if (proveedores.length === 0) {
            contenedor.innerHTML = '<p class="mensaje-vacio">No hay proveedores disponibles</p>';
            return;
        }
        
        // Usamos fragmento para mejor performance
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

// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', cargarProveedores);