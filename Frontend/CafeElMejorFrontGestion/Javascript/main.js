// js/main.js

import { obtenerProveedores } from './APIs/ProveedorApi.js';
import { crearTarjetaProveedor } from './Components/renderProveedor.js';

async function cargarProveedores() {
  const proveedores = await obtenerProveedores();
  const contenedor = document.getElementById('contenedor-proveedores');

  proveedores.forEach(proveedor => {
    const tarjeta = crearTarjetaProveedor(proveedor);
    contenedor.appendChild(tarjeta);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  cargarProveedores();
});
