// ---------- BOTÓN ¿NECESITAS AYUDA? ----------
const btnAyuda = document.getElementById('btn-ayuda-flotante');
const ventanaAyuda = document.getElementById('ventana-ayuda');
const cerrarAyuda = document.getElementById('cerrar-ayuda');

if (btnAyuda && ventanaAyuda && cerrarAyuda) {
  btnAyuda.addEventListener('click', () => {
    ventanaAyuda.classList.toggle('oculto');
  });

  cerrarAyuda.addEventListener('click', () => {
    ventanaAyuda.classList.add('oculto');
  });
}

// ---------- BOTÓN GESTIÓN DE SOPORTE ----------
function abrirGestion() {
  // SIEMPRE manda al login
  window.location.href = 'login.html';
}

const btnEnviar = document.getElementById('btn-enviar-ticket');
const inputNombre = document.getElementById('input-nombre');
const inputCorreo = document.getElementById('input-correo');
const inputComentario = document.getElementById('input-comentario');

btnEnviar.addEventListener('click', async () => {
  const titulo = `Soporte - ${inputNombre.value}`;
  const descripcion = `
Correo: ${inputCorreo.value}
Mensaje: ${inputComentario.value}
`;

  if (!inputNombre.value || !inputCorreo.value || !inputComentario.value) {
    alert('Por favor llena todos los campos');
    return;
  }

  const token = localStorage.getItem('token');

  if (!token) {
    alert('No estás autenticado');
    return;
  }

  try {
    const res = await fetch('http://localhost:3000/tareas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        titulo,
        descripcion
      })
    });

    if (!res.ok) {
      throw new Error('Error al enviar ticket');
    }

    alert('Ticket enviado correctamente ✅');

    // limpiar formulario
    inputNombre.value = '';
    inputCorreo.value = '';
    inputComentario.value = '';

  } catch (error) {
    console.error(error);
    alert('Error al enviar el ticket');
  }
});
