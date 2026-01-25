const btnAyuda = document.getElementById('btn-ayuda-flotante');
const ventanaAyuda = document.getElementById('ventana-ayuda');
const btnCerrar = document.getElementById('cerrar-ayuda');
const btnEnviar = document.getElementById('btn-enviar-ticket');

const inputNombre = document.getElementById('input-nombre');
const inputCorreo = document.getElementById('input-correo');
const inputComentario = document.getElementById('input-comentario');

btnAyuda.addEventListener('click', () => ventanaAyuda.classList.toggle('oculto'));
btnCerrar.addEventListener('click', () => ventanaAyuda.classList.add('oculto'));

btnEnviar.addEventListener('click', () => {
    const nombre = inputNombre.value.trim();
    const correo = inputCorreo.value.trim();
    const comentario = inputComentario.value.trim();

    if (!nombre || !correo || !comentario) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    const nuevoTicket = {
        id: Date.now(),
        nombre,
        correo,
        comentario,
        estado: 'pendiente',
        fecha: new Date().toLocaleString()
    };

    let tickets = JSON.parse(localStorage.getItem('tickets_soporte')) || [];
    tickets.push(nuevoTicket);
    localStorage.setItem('tickets_soporte', JSON.stringify(tickets));

    alert("¡Ticket enviado con éxito!");
    inputNombre.value = ""; inputCorreo.value = ""; inputComentario.value = "";
    ventanaAyuda.classList.add('oculto');
});

function abrirGestion() {
    window.open('gestion.html', '_blank');
}