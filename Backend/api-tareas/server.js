console.log("🚨 server.js inició ejecución");

// ---------------- IMPORTS ----------------
const express = require('express');
const fs = require('fs').promises;
const fsPromises = fs;
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ---------------- CONFIG ----------------
const app = express();
const PORT = 3000;
const SECRET_KEY = 'clave_super_secreta';

const RUTA_TAREAS = path.join(__dirname, 'tareas.json');
const RUTA_USUARIOS = path.join(__dirname, 'usuarios.json');

// ---------------- MIDDLEWARE ----------------
app.use(express.json());
// -------------------- MIDDLEWARE AUTH --------------------
function verificarToken(req, res, next) {
    const authHeader = req.headers['authorization'];
  
    if (!authHeader) {
      return res.status(401).json({
        mensaje: 'Token no proporcionado'
      });
    }
  
    // Formato esperado: Bearer TOKEN
    const token = authHeader.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({
        mensaje: 'Formato de token inválido'
      });
    }
  
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.usuario = decoded; // guardamos info del usuario
      next(); // continuar a la ruta
    } catch (error) {
      return res.status(401).json({
        mensaje: 'Token inválido o expirado'
      });
    }
  }
  

// ---------------- RUTA DE PRUEBA ----------------
app.get('/', (req, res) => {
  res.send('Servidor vivo 🚀');
});

// ---------------- TAREAS ----------------
app.get('/tareas', verificarToken, async (req, res) => {

  try {
    const data = await fs.readFile(RUTA_TAREAS, 'utf-8');
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ mensaje: 'Error leyendo tareas' });
  }
});

app.post('/tareas', verificarToken, async (req, res) => {
  try {
    const { titulo, descripcion } = req.body;

    if (!titulo || !descripcion) {
      return res.status(400).json({ mensaje: 'Datos incompletos' });
    }

    const data = await fs.readFile(RUTA_TAREAS, 'utf-8');
    const tareas = JSON.parse(data);

    const nueva = {
      id: Date.now(),
      titulo,
      descripcion
    };

    tareas.push(nueva);

    await fs.writeFile(RUTA_TAREAS, JSON.stringify(tareas, null, 2));
    res.status(201).json(nueva);

  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error creando tarea' });
  }
});

// -------------------- ACTUALIZAR TAREA --------------------
app.put('/tareas/:id', verificarToken, async (req, res) => {
    try {
      const id = Number(req.params.id);
      const { titulo, descripcion, estado } = req.body;
  
      const data = await fsPromises.readFile(RUTA_TAREAS, 'utf-8');
      const tareas = JSON.parse(data);
  
      const index = tareas.findIndex(t => t.id === id);
  
      if (index === -1) {
        return res.status(404).json({ mensaje: 'Tarea no encontrada' });
      }
  
      tareas[index] = {
        ...tareas[index],
        titulo: titulo ?? tareas[index].titulo,
        descripcion: descripcion ?? tareas[index].descripcion,
        estado: estado ?? tareas[index].estado
      };
  
      await fsPromises.writeFile(
        RUTA_TAREAS,
        JSON.stringify(tareas, null, 2)
      );
  
      res.json(tareas[index]);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al actualizar la tarea' });
    }
  });

  // -------------------- ELIMINAR TAREA --------------------
app.delete('/tareas/:id', verificarToken, async (req, res) => {
    try {
      const id = Number(req.params.id);
  
      const data = await fsPromises.readFile(RUTA_TAREAS, 'utf-8');
      const tareas = JSON.parse(data);
  
      const index = tareas.findIndex(t => t.id === id);
  
      if (index === -1) {
        return res.status(404).json({ mensaje: 'Tarea no encontrada' });
      }
  
      const eliminada = tareas.splice(index, 1);
  
      await fsPromises.writeFile(
        RUTA_TAREAS,
        JSON.stringify(tareas, null, 2)
      );
  
      res.json({
        mensaje: 'Tarea eliminada',
        tarea: eliminada[0]
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al eliminar la tarea' });
    }
  });
  
  

// ---------------- REGISTER ----------------
app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    const data = await fs.readFile(RUTA_USUARIOS, 'utf-8');
    const usuarios = JSON.parse(data);

    const existe = usuarios.find(u => u.email === email);
    if (existe) {
      return res.status(400).json({ mensaje: 'Usuario ya existe' });
    }

    const hash = await bcrypt.hash(password, 10);

    usuarios.push({
      id: Date.now(),
      email,
      password: hash
    });

    await fs.writeFile(RUTA_USUARIOS, JSON.stringify(usuarios, null, 2));
    res.json({ mensaje: 'Usuario registrado' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error en registro' });
  }
});

// ---------------- LOGIN ----------------
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const data = await fs.readFile(RUTA_USUARIOS, 'utf-8');
    const usuarios = JSON.parse(data);

    const usuario = usuarios.find(u => u.email === email);
    if (!usuario) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    const ok = await bcrypt.compare(password, usuario.password);
    if (!ok) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.json({ token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error en login' });
  }
});

// ---------------- LISTEN ----------------
app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
});
