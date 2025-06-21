import { GetAll as GetAllProveedores, CreateProveedor } from './../APIs/ProveedorApi.js';
import { crearFilaProveedor } from './../Components/ProveedorComponents/renderTablaProveedores.js';
import { configurarFormularioEditar, configurarBotonCancelarEditar } from './../Handlers/ProveedorHandler/EditarProveedorHandler.js';
import { 
    configurarBotonNuevoProveedor, 
    configurarFormularioAgregar,
    configurarBotonCancelarAgregar
} from './../Handlers/ProveedorHandler/AgregarProveedorHandler.js';
import { configurarBusquedaProveedor } from './../Handlers/ProveedorHandler/BuscarProveedoreHandler.js';

async function cargarProveedores() {
    try {
        const cuerpoTabla = document.querySelector('.tabla-proveedores tbody');
        if (!cuerpoTabla) {
        console.error("No se encontró el cuerpo de la tabla de clientes");
        return;
        }
        cuerpoTabla.innerHTML = ''; // Limpiar tabla

        const proveedores = await GetAllProveedores();
        console.log("Proveedores:", proveedores);
        if (proveedores.length === 0) {
            const filaVacia = document.createElement('tr');
            filaVacia.innerHTML = '<td colspan="9">No hay proveedores disponibles</td>';
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

export function iniciarPaginaProveedores() {

     // 1. Carga la lista inicial de proveedores
    cargarProveedores();
    // 2. Configura los botones y formularios para la funcionalidad de "Agregar"
    configurarBotonNuevoProveedor();

    // Le pasamos 'cargarProveedores' para que pueda recargar la lista después de agregar.
    configurarFormularioAgregar(cargarProveedores); 
    configurarBotonCancelarAgregar();

    // Configurar formularios
    configurarFormularioEditar();
    configurarFormularioCreacion();
    configurarBotonCancelarEditar();

    //boton buscar 
    configurarBusquedaProveedor();
}
