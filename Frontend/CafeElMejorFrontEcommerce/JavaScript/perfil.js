document.addEventListener('DOMContentLoaded', function () {
    const usuario = localStorage.getItem("usuarioLogueado");
    if (!usuario) {
        alert("Debes iniciar sesión primero");
        window.location.href = "iniciar-sesion.html";
        return;
    }

    document.getElementById('nombre').value = usuario;
    const email = localStorage.getItem(usuario + "_email");
    const telefono = localStorage.getItem(usuario + "_telefono");

    if (email) document.getElementById('email').value = email;
    if (telefono) document.getElementById('telefono').value = telefono;

    document.getElementById('form-perfil').addEventListener('submit', function(e) {
        e.preventDefault();
        localStorage.setItem(usuario + "_email", document.getElementById('email').value);
        localStorage.setItem(usuario + "_telefono", document.getElementById('telefono').value);
        alert("Datos guardados correctamente");
    });
});