
import { GetAll } from './../../APIs/ProveedorApi.js'; 

// Asumimos que tienes este componente que crea un <option>.
import { crearOpcionProveedor } from './../../Components/OCComponents/renderProveedores.js';


export async function cargarProveedoresEnSelector() {
    const selector = document.getElementById('selector-proveedor');
    
    if (!selector) {
        console.error("Elemento '#selector-proveedor' no encontrado en el DOM.");
        return;
    }

    try {
        const proveedores = await GetAll();
        
        if (proveedores.length === 0) {
            selector.innerHTML = '<option value="">No hay proveedores disponibles</option>';
            return;
        }

        // Usamos un DocumentFragment para mejorar el rendimiento.
        const fragment = document.createDocumentFragment();
        proveedores.forEach(proveedor => {
            const opcion = crearOpcionProveedor(proveedor);
            fragment.appendChild(opcion);
        });

        selector.appendChild(fragment);

    } catch (error) {
        console.error("Error al cargar la lista de proveedores:", error);
        selector.innerHTML = '<option value="">Error al cargar proveedores</option>';
    }
}

/**
 * Configura la fecha de la orden para que no se pueda seleccionar un día anterior al actual.
 */
export function configurarFechaMinima() {
    const inputFecha = document.getElementById('fecha-orden');
    if (inputFecha) {
        const hoy = new Date().toISOString().split('T')[0];
        inputFecha.setAttribute('min', hoy);
        inputFecha.value = hoy; // Opcional: Pone la fecha de hoy por defecto.
    }
}
