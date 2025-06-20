window.addEventListener("DOMContentLoaded", () => {
    const registrar = document.querySelector(".registrar");
    const modal = document.getElementById("modal");
    const cerrar = document.getElementById("cerrar-modal");

        registrar.addEventListener("click", (event) => {
        // LÍNEA CLAVE: Prevenimos que el formulario se envíe y la página se recargue.
        event.preventDefault(); 
        
        // Ahora sí, mostramos el modal sin que la página se refresque.
        modal.classList.remove("oculto");
    });
    
    cerrar.addEventListener("click", () => {
        modal.classList.add("oculto");
    });
});