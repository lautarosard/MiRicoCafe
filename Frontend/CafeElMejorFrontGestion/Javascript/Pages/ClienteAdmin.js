
import { GetAll as GetAllClientes, CreateCliente} from './../APIs/ClienteApi.js';
import { crearFilaCliente} from './../Components/ClientesComponents/renderTablaClientes.js';
import { configurarFormularioEditarCliente} from './../Handlers/ClienteHandler/EditarClienteHandler.js';
import { GetByDni } from './../APIs/ClienteApi.js';

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

// document.getElementById('botonBuscarDni').addEventListener('click', async () => {
//     const dni = document.getElementById('buscar').value.trim();

//     if (!dni) {
//         alert("Por favor ingrese un DNI.");
//         return;
//     }

//     try {
//         const cliente = await GetByDni(dni);
        
//         const cuerpoTabla = document.querySelector('.tabla-clienteAdmin tbody');
//         cuerpoTabla.innerHTML = ''; // limpiar tabla

//         const fila = crearFilaCliente(cliente);
//         cuerpoTabla.appendChild(fila);
//     } catch (error) {
//         alert("No se encontró ningún cliente con ese DNI.");
//     }
// });


export function iniciarPaginaClientes() {

    configurarFormularioEditarCliente();
    configurarFormularioCreacionCliente();
    cargarCliente();
}
