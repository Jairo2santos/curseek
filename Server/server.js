const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();
const helmet = require('helmet');
const compression = require('compression');
const apiRouter = require('./routes/api');
const path = require('path');
const rateLimit = require('express-rate-limit');

// Middleware para verificar el encabezado Referer
const checkRefererHeader = (req, res, next) => {
  const referer = req.get('Referer');
  
  // Lista de dominios permitidos
  const allowedDomains = [
    'http://localhost:5173',
    'https://curseek.com',
    'http://localhost:3000', 
  ];

  // Verificar si el dominio del encabezado Referer está en la lista de permitidos
  if (referer && allowedDomains.some(domain => referer.startsWith(domain))) {
    next(); // Si coincide, continuar con la siguiente función de middleware
  } else {
    res.status(403).send('Acceso denegado. Origen no permitido.');
  }
};

// Configuración del limitador de tasa de peticiones
const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limita cada IP a 100 solicitudes por ventana de tiempo (aquí, por 15 minutos)
  standardHeaders: true, // Devuelve la información del límite de tasa en los headers `RateLimit-*`
  legacyHeaders: false, // Deshabilita los headers `X-RateLimit-*`
  message: "Demasiadas solicitudes desde esta IP, por favor intente de nuevo más tarde.",
});

// Middleware cors
app.use(cors({
  origin: [
    'http://localhost:5173', // El cliente de desarrollo de Vite
    'http://localhost:3000', // El servidor SSR
    'https://curseek.com', // El dominio de producción
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use('/api/users/uploads', (req, res, next) => {
  res.header('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
}, express.static(path.join(__dirname, 'uploads')));

app.use(checkRefererHeader);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());

// Aplicar el middleware de limitación de tasa a todas las rutas API
app.use('/api', apiRateLimiter, apiRouter);

app.use('/api/users/uploads', express.static(path.join(__dirname, 'uploads')));

// Conectar con MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, "Error conectando a MongoDB:"));
db.once('open', () => {
  console.log("Conexión exitosa a MongoDB");
});

// Manejador de errores globales
app.use((error, req, res, next) => {
  console.error(error.message);
  res.status(500).send("Error interno del servidor");
});

// Iniciar el servidor
const PORT = process.env.PORT || 3333;
const IP = process.env.IP || '0.0.0.0';
app.listen(PORT, IP, () => {
  console.log(`Servidor escuchando en ${IP}:${PORT}`);
});
