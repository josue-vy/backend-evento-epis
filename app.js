require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

const qrRoutes = require('./routes/asistenciaRoute');
const loginRoutes = require('./routes/loginRoute');
const qrRoute = require('./routes/qrRoute'); // Ya estás importando esta ruta

const http = require('http');
const app = express();
const port = 3000;

// Configuración de sesiones
app.use(
  session({
    secret: 'mi_clave_secreta', // Mantén esto simple si es un despliegue rápido
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true, // Cookies seguras en producción
      httpOnly: true,
      sameSite: 'Lax',
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(cors({
  origin: 'https://evento-epis-omx3whl1f-epis.vercel.app', // URL de tu frontend
  credentials: true
}));

// Middleware de body-parser
app.use(bodyParser.json());

// Rutas
app.use('/backend', loginRoutes); // Asegúrate de que las rutas de login estén separadas
app.use('/backend', qrRoutes);    // Rutas para manejo de asistencia
app.use('/backend', qrRoute);    // Rutas para manejar validación del QR

// Inicia el servidor HTTP
http.createServer(app).listen(port, () => {
  console.log(`Servidor HTTP escuchando en http://localhost:${port}`);
});
