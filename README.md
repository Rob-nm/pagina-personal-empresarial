Replica de Airbnb - Sistema de Gestión de Soporte 
🧠 Descripción general

Este proyecto es un Sistema de Gestión de Soporte inspirado en el flujo de tickets de plataformas como Airbnb. Permite:

* Crear tickets de soporte
* Autenticarse como administrador
* Visualizar tickets
* Cambiar estatus (pendiente / completado)
* Eliminar tickets (eliminación lógica)
El sistema está dividido en Backend y Frontend, comunicándose mediante una API REST protegida con JWT.

🛠️ Requisitos previos

Antes de ejecutar el proyecto necesitas tener instalado:
1. Node.js (versión recomendada LTS)
    * Verificar instalación: node -v
      
2. npm (se instala junto con Node.js) npm -v
3. 
4. Un navegador web moderno (Chrome recomendado)
5. (Opcional) Postman para pruebas de la API

📂 Estructura del proyecto
Proyecto/
│
├── Backend/
│   ├── server.js
│   ├── usuarios.json
│   ├── tareas.json
│
├── Frontend/
│   ├── index.html
│   ├── login.html
│   ├── login.js
│   ├── styles.css
│   ├── admin/
│   │   ├── admin.html
│   │   └── admin.js

▶️ Cómo ejecutar el proyecto
1️⃣ Iniciar el Backend
Desde la carpeta Backend:
npm install
node server.js
Si todo está correcto, verás un mensaje indicando que el servidor corre en:
http://localhost:3000

2️⃣ Abrir el Frontend
* Abre la carpeta Frontend
* Abre index.html con Live Server o directamente desde el navegador

🔐 Uso del sistema
🧾 Crear un ticket
* Desde index.html
* Completa el formulario
* El ticket se guarda automáticamente
  
🔑 Acceso administrador
* Presiona Gestión de Soporte
* Inicia sesión con un usuario registrado
* email: admin@soporte.com
* contraseña: 123456
  
🧰 Gestión de tickets
Desde el panel de administrador puedes:
* Ver tickets
* Marcar como completados ✅
* Eliminar tickets ❌ 



