const form = document.getElementById('loginForm');
const mensaje = document.getElementById('mensaje');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    let data;
    try {
      data = await res.json();
    } catch {
      mensaje.textContent = 'Respuesta inválida del servidor';
      return;
    }

    if (!res.ok) {
      mensaje.textContent = data.mensaje || 'Error al iniciar sesión';
      return;
    }

    localStorage.setItem('token', data.token);
    // Redirigir al panel admin
    window.location.href = 'admin/admin.html';




  } catch (error) {
    console.error(error);
    mensaje.textContent = 'No se pudo conectar con el servidor';
  }
});
