document.addEventListener('DOMContentLoaded', function () {
    const usuario = localStorage.getItem("usuarioLogueado");

    if (usuario) {
        const submenu = document.querySelector('.dropdown-usuario .submenu');
        if (submenu) {
            submenu.innerHTML = `
                <li><a href="perfil.html">Mi Perfil</a></li>
                <li><a href="#" id="cerrarSesion">Salir</a></li>
            `;
            document.getElementById('cerrarSesion').addEventListener('click', function () {
                localStorage.removeItem("usuarioLogueado");
                window.location.href = "index.html";
            });
        }
    }
});