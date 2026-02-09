const contenedor = document.getElementById('lista-tickets');
const token = localStorage.getItem('token');

if (!token) {
  window.location.href = '../login.html';
}

async function cargarTickets() {
  try {
    const res = await fetch('http://localhost:3000/tareas', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });

    const tareas = await res.json();
    contenedor.innerHTML = '';

    tareas
      .filter(t => !t.eliminado)
      .forEach(tarea => {

        const div = document.createElement('div');
        div.className = 'ticket';

        const estatus = tarea.estatus || 'pendiente';
        const asignado = tarea.asignadoA || 'Sin asignar';
        const fecha = tarea.fechaCreacion
          ? new Date(tarea.fechaCreacion).toLocaleString()
          : 'Fecha no disponible';

        const estadoClase =
          estatus === 'completado'
            ? 'estado completado'
            : 'estado pendiente';

            div.innerHTML = `
            <div>
              <h3>${tarea.titulo}</h3>
              <div class="meta">${tarea.descripcion}</div>
              <div class="meta">${fecha}</div>
            </div>
          
            <div class="${estadoClase}">
              ${estatus}
            </div>
          
            <div class="asignado">
              ${asignado}
            </div>
          
            <div class="acciones">
              <button onclick="completarTarea(${tarea.id})">✔</button>
              <button onclick="eliminarTarea(${tarea.id})">🗑</button>
            </div>
          `;
          

        contenedor.appendChild(div);
      });

  } catch (err) {
    console.error(err);
    contenedor.innerHTML = '<p>Error al cargar tickets</p>';
  }
}

// -------- COMPLETAR --------
async function completarTarea(id) {
  await fetch(`http://localhost:3000/tareas/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ estatus: 'completado' })
  });

  cargarTickets();
}

// -------- ELIMINAR --------
async function eliminarTarea(id) {
  await fetch(`http://localhost:3000/tareas/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ eliminado: true })
  });

  cargarTickets();
}

cargarTickets();

async function completarTarea(id) {
    await fetch(`http://localhost:3000/tareas/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        estatus: 'completado',
        asignadoA: 'Soporte'
      })
    });
  
    cargarTickets();
  }
  
  async function eliminarTarea(id) {
    await fetch(`http://localhost:3000/tareas/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
  
    cargarTickets();
  }
  