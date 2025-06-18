export default function configurarDialogs() {
  const dialogEliminar = document.getElementById('dialogEliminar');
  const dialogEditar = document.getElementById('dialogEditar');

  document.querySelector('table').addEventListener('click', (e) => {
    const boton = e.target;

    if (boton.classList.contains('boton-eliminar')) {
      dialogEliminar.showModal();
    }

    if (boton.classList.contains('boton-editar')) {
      const fila = boton.closest('tr');
      const producto = {
        codigo: fila.children[1].textContent,
        marca: fila.children[2].textContent,
        descripcion: fila.children[3].textContent,
        proveedor: fila.children[4].textContent,
        stock: fila.children[5].textContent,
        fecha: formatearFechaParaInput(fila.children[6].textContent),
        precio: fila.children[7].textContent,
      };

      cargarDatosEnFormulario(producto);
      dialogEditar.showModal();
    }
  });

  document.getElementById('confirmarEliminar').addEventListener('click', () => {
    dialogEliminar.close();
    alert('Producto eliminado');
  });

  document.getElementById('confirmarEditar').addEventListener('click', () => {
    dialogEditar.close();
    alert('Redirigiendo a edición ');
  });
}

function formatearFechaParaInput(fecha) {
  const [dia, mes, anio] = fecha.split('/');
  return `${anio}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
}

function cargarDatosEnFormulario(producto) {
  document.getElementById('editCodigo').value = producto.codigo;
  document.getElementById('editMarca').value = producto.marca;
  document.getElementById('editDescripcion').value = producto.descripcion;
  document.getElementById('editProveedor').value = producto.proveedor;
  document.getElementById('editStock').value = producto.stock;
  document.getElementById('editFecha').value = producto.fecha;
  document.getElementById('editPrecio').value = producto.precio;
}
