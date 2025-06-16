window.addEventListener("DOMContentLoaded", () => {
    const registrar = document.querySelector(".registrar");
    const modal = document.getElementById("modal");
    const cerrar = document.getElementById("cerrar-modal");

    registrar.addEventListener("click", () => {
        modal.classList.remove("oculto");
    });

    cerrar.addEventListener("click", () => {
        modal.classList.add("oculto");
    });
});

window.addEventListener("DOMContentLoaded", () => {
    const registrar = document.querySelector(".boton-iniciarsesion");
    const modal = document.getElementById("modal");
    const cerrar = document.getElementById("cerrar-modal");

    registrar.addEventListener("click", () => {
        modal.classList.remove("oculto");
    });

    cerrar.addEventListener("click", () => {
        modal.classList.add("oculto");
    });
});