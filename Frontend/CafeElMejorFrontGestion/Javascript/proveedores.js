document.addEventListener('DOMContentLoaded', function() {

    // --- ELEMENTOS DEL DOM ---
    // Modal de Edición
    const modalEditar = document.getElementById("modalEditar");
    const formEditar = document.getElementById("formEditar");
    // (El botón para cerrar el modal de edición se maneja con 'cerrarModalEditar()' global)

    // Modal de Confirmación de Eliminación
    const modalConfirmarEliminar = document.getElementById("modalConfirmarEliminar");
    const spanNombreProveedorEliminar = document.getElementById("nombreProveedorEliminar");
    const botonSiEliminar = document.getElementById("botonConfirmarSi");
    const botonCancelarEliminar = document.getElementById("botonConfirmarCancelar");

    // Botones de la tabla
    const botonesEditar = document.querySelectorAll(".tabla-proveedores .boton-editar");
    const botonesEliminar = document.querySelectorAll(".tabla-proveedores .boton-eliminar");

    // Otros elementos
    const botonNuevoProveedorCabecera = document.querySelector(".cabecera-seccion .boton-nuevo");
    const inputBuscar = document.getElementById("buscar");
    const botonBuscarEnOpciones = document.querySelector(".opciones-proveedores .boton-nuevo"); // Asumiendo que este es el botón de búsqueda

    let filaAEliminar = null; // Variable para guardar la fila que se va a eliminar

    // --- FUNCIONALIDAD DEL MODAL DE EDICIÓN ---

    // Función para abrir el modal de edición
    function abrirModalEditar() {
        if (modalEditar) {
            modalEditar.style.display = "block";
        }
    }

    // Función para cerrar el modal de edición (se hace global para el 'onclick' del HTML)
    window.cerrarModalEditar = function() {
        if (modalEditar) {
            modalEditar.style.display = "none";
        }
    }

    // Asignar evento a todos los botones de "Editar" en la tabla
    botonesEditar.forEach(boton => {
        boton.addEventListener("click", function () {
            const fila = this.closest("tr");
            if (fila) {
                const celdas = fila.querySelectorAll("td");
                if (formEditar && celdas.length >= 5) {
                    formEditar.elements['editId'].value = celdas[0].textContent.trim();
                    formEditar.elements['editNombre'].value = celdas[1].textContent.trim();
                    formEditar.elements['editEmail'].value = celdas[2].textContent.trim();
                    formEditar.elements['editTelefono'].value = celdas[3].textContent.trim();
                    formEditar.elements['editCUIT'].value = celdas[4].textContent.trim();
                }
                abrirModalEditar();
            }
        });
    });

    // Evento de guardar (submit del formulario del modal de edición)
    if (formEditar) {
        formEditar.addEventListener("submit", function (e) {
            e.preventDefault(); 
            // Aquí lógica para enviar datos actualizados al backend
            const id = formEditar.elements['editId'].value;
            const nombre = formEditar.elements['editNombre'].value;
            console.log("Datos actualizados (simulación):", { id, nombre /* ...otros datos */ });
            alert("Datos actualizados (simulación frontend). Revisa la consola.");
            
            // Opcional: Actualizar la fila en la tabla HTML dinámicamente
            // Esto requeriría encontrar la fila original, por ejemplo, usando el ID.
            // const filaOriginal = document.querySelector(`tr[data-id='${id}']`); // Si tuvieras un data-id en el <tr>
            // if(filaOriginal) {
            //     filaOriginal.querySelectorAll("td")[1].textContent = nombre;
            //     // ... actualizar otras celdas ...
            // }

            cerrarModalEditar();
        });
    }

    // --- FUNCIONALIDAD DEL MODAL DE CONFIRMACIÓN DE ELIMINACIÓN ---

    // Función para mostrar el modal de confirmación
    function abrirModalConfirmacion(fila, nombreProveedor) {
        filaAEliminar = fila; 
        if (spanNombreProveedorEliminar) {
            spanNombreProveedorEliminar.textContent = nombreProveedor; 
        }
        if (modalConfirmarEliminar) {
            modalConfirmarEliminar.style.display = "block";
        }
    }

    // Función para cerrar el modal de confirmación
    function cerrarModalConfirmacion() {
        filaAEliminar = null; 
        if (modalConfirmarEliminar) {
            modalConfirmarEliminar.style.display = "none";
        }
    }

    // Asignar evento a todos los botones de "Eliminar" en la tabla
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", function() {
            const fila = this.closest("tr");
            if (fila) {
                const idProveedor = fila.querySelectorAll("td")[0].textContent.trim(); 
                const nombreProveedor = fila.querySelectorAll("td")[1].textContent.trim(); 
                abrirModalConfirmacion(fila, nombreProveedor); 
            }
        });
    });

    // Event listener para el botón "Sí, eliminar" en el modal de confirmación
    if (botonSiEliminar) {
        botonSiEliminar.addEventListener("click", function() {
            if (filaAEliminar) {
                const idProveedor = filaAEliminar.querySelectorAll("td")[0].textContent.trim();
                const nombreProveedor = filaAEliminar.querySelectorAll("td")[1].textContent.trim();

                // --- Inicio de Lógica de Eliminación REAL (aquí iría el fetch al backend) ---
                // Ejemplo:
                // fetch(`/api/proveedores/${idProveedor}`, { method: 'DELETE' })
                // .then(response => {
                //     if (!response.ok) throw new Error('Error al eliminar del servidor');
                //     return response.json(); // o .text() si no devuelve JSON
                // })
                // .then(data => {
                //     console.log('Proveedor eliminado del backend:', data);
                //     filaAEliminar.remove(); // Elimina la fila del frontend DESPUÉS de confirmar el backend
                //     alert(`Proveedor "${nombreProveedor}" eliminado exitosamente.`);
                // })
                // .catch(error => {
                //     console.error('Error en la eliminación del backend:', error);
                //     alert(`Error: No se pudo eliminar el proveedor. ${error.message}`);
                // });
                // --- Fin de Lógica de Eliminación REAL ---

                // Simulación frontend (mientras no hay backend):
                console.log(`Eliminando (confirmado) proveedor ID: ${idProveedor}, Nombre: ${nombreProveedor}`);
                alert(`Proveedor "${nombreProveedor}" ha sido eliminado (simulación frontend).`);
                filaAEliminar.remove(); 
                
                cerrarModalConfirmacion();
            }
        });
    }

    // Event listener para el botón "Cancelar" en el modal de confirmación
    if (botonCancelarEliminar) {
        botonCancelarEliminar.addEventListener("click", function() {
            cerrarModalConfirmacion();
        });
    }

    // Opcional: Cerrar modales si se hace clic fuera de su contenido
    [modalEditar, modalConfirmarEliminar].forEach(modal => {
        if (modal) {
            modal.addEventListener('click', function(event) {
                if (event.target === modal) { // Si se hizo clic en el fondo del modal
                    if (modal === modalEditar) cerrarModalEditar();
                    if (modal === modalConfirmarEliminar) cerrarModalConfirmacion();
                }
            });
        }
    });


    // --- OTRAS FUNCIONALIDADES ---

    // Botón "Nuevo Proveedor" (Ejemplo básico)
    if (botonNuevoProveedorCabecera) {
        botonNuevoProveedorCabecera.addEventListener("click", function() {
            alert("Funcionalidad 'Nuevo Proveedor' aún no implementada. Podrías abrir un modal similar al de edición pero vacío.");
            // Ejemplo:
            // if (formEditar) {
            //     formEditar.reset(); // Limpia el formulario de edición
            //     formEditar.elements['editId'].value = "AUTO"; // Indicar que es nuevo
            // }
            // abrirModalEditar(); 
        });
    }

    // Funcionalidad de Búsqueda (Ejemplo básico de frontend)
    if (inputBuscar && botonBuscarEnOpciones) {
        function filtrarProveedores() {
            const textoBusqueda = inputBuscar.value.toLowerCase().trim();
            const filas = document.querySelectorAll(".tabla-proveedores tbody tr");

            filas.forEach(fila => {
                // Asume que el nombre del proveedor está en la segunda celda (índice 1)
                const nombreProveedor = fila.querySelectorAll("td")[1].textContent.toLowerCase();
                if (nombreProveedor.includes(textoBusqueda)) {
                    fila.style.display = ""; // Mostrar fila
                } else {
                    fila.style.display = "none"; // Ocultar fila
                }
            });
        }

        botonBuscarEnOpciones.addEventListener("click", filtrarProveedores);
        inputBuscar.addEventListener("keyup", function(event) {
            // Para buscar mientras se escribe (puedes descomentar o ajustar)
            // filtrarProveedores(); 
            // O buscar solo al presionar Enter:
            if (event.key === "Enter") {
                filtrarProveedores();
            }
        });
    }

});