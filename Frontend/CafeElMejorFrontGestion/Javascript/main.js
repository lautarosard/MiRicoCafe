// import { GetAll, CreateProveedor } from './APIs/ProveedorApi.js';
// import { crearFilaProveedor } from './Components/renderTablaProveedores.js';
// import { configurarFormularioEditar } from './Handlers/EditarProveedorHandler.js';

import { GetAll as GetAllClientes, CreateCliente} from './APIs/ClienteApi.js';
import { crearFilaCliente} from './Components/ClientesComponents/renderTablaClientes.js';
import { configurarFormularioEditarCliente } from './Handlers/ClienteHandler/EditarClienteHandler.js';
console.log("hola");
async function cargarCliente() {
    try {
        const cuerpoTabla = document.querySelector('.tabla-clienteAdmin tbody');
        cuerpoTabla.innerHTML = ''; // Limpiar tabla

        const Cliente = await GetAllClientes();
        // console.log(await GetAll());
        console.log("Cliente:", Cliente);
        if (Cliente.length === 0) {
            const filaVacia = document.createElement('tr');
            filaVacia.innerHTML = '<td colspan="6">No hay Cliente disponibles</td>';
            cuerpoTabla.appendChild(filaVacia);
            return;
        }

        const fragment = document.createDocumentFragment();
        Cliente.forEach(cliente => {
            const fila = crearFilaCliente(cliente);
            fragment.appendChild(fila);
        });

        cuerpoTabla.appendChild(fragment);

    } catch (error) {
        console.error('Error en cargarCliente:', error);

        const cuerpoTabla = document.querySelector('.tabla-clienteAdmin tbody');
        const filaError = document.createElement('tr');
        filaError.innerHTML = '<td colspan="6">Error al cargar los Cliente</td>';
        cuerpoTabla.appendChild(filaError);
    }
}
function configurarFormularioCreacionCliente() {
    const form = document.getElementById('form-clienteAdmin');
    const mensaje = document.getElementById('mensaje');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const Cliente = {
            nombre: document.getElementById('nombre').value,
            email: document.getElementById('email').value,
            Dni: document.getElementById('DNI').value
        };

        try {
            const creado = await CreateCliente(Cliente);
            mensaje.textContent = `Cliente creado con ID: ${creado.idCliente}`;
            form.reset();
            cargarCliente(); // recargar lista
        } catch (error) {
            mensaje.textContent = "Error al crear Cliente.";
            console.error(error);
        }
    });
}





// // Cargar proveedores
// async function cargarProveedores() {
//     try {
//         const cuerpoTabla = document.querySelector('.tabla-proveedores tbody');
//         cuerpoTabla.innerHTML = ''; // Limpiar tabla

//         const proveedores = await GetAll();
//         console.log("Proveedores:", proveedores);
//         if (proveedores.length === 0) {
//             const filaVacia = document.createElement('tr');
//             filaVacia.innerHTML = '<td colspan="6">No hay proveedores disponibles</td>';
//             cuerpoTabla.appendChild(filaVacia);
//             return;
//         }

//         const fragment = document.createDocumentFragment();
//         proveedores.forEach(proveedor => {
//             const fila = crearFilaProveedor(proveedor);
//             fragment.appendChild(fila);
//         });

//         cuerpoTabla.appendChild(fragment);

//     } catch (error) {
//         console.error('Error en cargarProveedores:', error);

//         const cuerpoTabla = document.querySelector('.tabla-proveedores tbody');
//         const filaError = document.createElement('tr');
//         filaError.innerHTML = '<td colspan="6">Error al cargar los proveedores</td>';
//         cuerpoTabla.appendChild(filaError);
//     }
// }

// function configurarFormularioCreacion() {
//     const form = document.getElementById('form-proveedor');
//     const mensaje = document.getElementById('mensaje');

//     if (!form) return;

//     form.addEventListener('submit', async (e) => {
//         e.preventDefault();

//         const proveedor = {
//             nombre: document.getElementById('nombre').value,
//             email: document.getElementById('email').value,
//             telefono: document.getElementById('telefono').value,
//             provincia: document.getElementById('provincia').value,
//             localidad: document.getElementById('localidad').value,
//             direccion: document.getElementById('direccion').value,
//             cuit: document.getElementById('cuit').value
//         };

//         try {
//             const creado = await CreateProveedor(proveedor);
//             mensaje.textContent = `Proveedor creado con ID: ${creado.idProveedor}`;
//             form.reset();
//             cargarProveedores(); // recargar lista
//         } catch (error) {
//             mensaje.textContent = "Error al crear proveedor.";
//             console.error(error);
//         }
//     });
// }

document.addEventListener('DOMContentLoaded', () => {
    // configurarFormularioEditar();
    // configurarFormularioCreacion();
    // cargarProveedores();  
    configurarFormularioEditarCliente();
    configurarFormularioCreacionCliente();
    cargarCliente();
})
