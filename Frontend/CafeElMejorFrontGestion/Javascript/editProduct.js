export default function configurarFormularioEditar() {
  const form = document.getElementById('formEditarProducto');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const datos = {
      codigo: form.editCodigo.value,
      marca: form.editMarca.value,
      descripcion: form.editDescripcion.value,
      proveedor: form.editProveedor.value,
      stock: form.editStock.value,
      fecha: form.editFecha.value,
      precio: form.editPrecio.value
    };

    console.log('Producto editado:', datos);
    alert('Producto actualizado (simulado)');
    document.getElementById('dialogEditar').close();
  });
}
