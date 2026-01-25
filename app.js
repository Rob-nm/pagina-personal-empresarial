/* =========================================
   REFERENCIAS A ELEMENTOS DE LA PÁGINA
   ========================================= */

// Aquí le decimos al código qué botones y cuadros de texto del HTML debe controlar
const btnAyuda = document.getElementById('btn-ayuda-flotante');
const ventanaAyuda = document.getElementById('ventana-ayuda');
const btnCerrar = document.getElementById('cerrar-ayuda');
const btnEnviar = document.getElementById('btn-enviar-ticket');

// Referencias a los campos donde el usuario escribe su información
const inputNombre = document.getElementById('input-nombre');
const inputCorreo = document.getElementById('input-correo');
const inputComentario = document.getElementById('input-comentario');

/* =========================================
   CONTROL DE LA VENTANA DE AYUDA
   ========================================= */

// Al hacer clic en el botón de interrogación, se muestra o se oculta el panel de ayuda
btnAyuda.addEventListener('click', () => ventanaAyuda.classList.toggle('oculto'));

// Al hacer clic en la "X", cerramos el panel de ayuda (le ponemos la clase 'oculto')
btnCerrar.addEventListener('click', () => ventanaAyuda.classList.add('oculto'));

/* =========================================
   LÓGICA PARA ENVIAR UN TICKET DE SOPORTE
   ========================================= */

// Esta función se activa cuando el usuario hace clic en el botón "Enviar Ticket"
btnEnviar.addEventListener('click', () => {
    // Obtenemos los textos escritos y quitamos espacios vacíos innecesarios
    const nombre = inputNombre.value.trim();
    const correo = inputCorreo.value.trim();
    const comentario = inputComentario.value.trim();

    // Verificamos que el usuario no haya dejado ningún campo vacío
    if (!nombre || !correo || !comentario) {
        alert("Por favor, completa todos los campos.");
        return; // Si falta algo, detenemos el proceso aquí
    }

    // Creamos un objeto (una ficha) con toda la información del reporte
    const nuevoTicket = {
        id: Date.now(), // Usamos la hora exacta como un número de folio único
        nombre,
        correo,
        comentario,
        estado: 'pendiente', // Por defecto, el reporte nace como "pendiente"
        fecha: new Date().toLocaleString() // Guardamos la fecha y hora del envío
    };

    /* GUARDADO EN MEMORIA (LocalStorage) */
    // Traemos la lista de reportes anteriores que ya estén guardados en el navegador
    let tickets = JSON.parse(localStorage.getItem('tickets_soporte')) || [];
    
    // Agregamos el nuevo reporte a esa lista
    tickets.push(nuevoTicket);
    
    // Volvemos a guardar la lista actualizada en la memoria del navegador
    localStorage.setItem('tickets_soporte', JSON.stringify(tickets));

    // Avisamos al usuario que todo salió bien y limpiamos el formulario
    alert("¡Ticket enviado con éxito!");
    inputNombre.value = ""; 
    inputCorreo.value = ""; 
    inputComentario.value = "";
    
    // Cerramos la ventana de ayuda automáticamente
    ventanaAyuda.classList.add('oculto');
});

/* =========================================
   ACCESO AL PANEL DE ADMINISTRACIÓN
   ========================================= */

// Esta función abre la página de gestión de tickets en una pestaña nueva
function abrirGestion() {
    window.open('gestion.html', '_blank');
}