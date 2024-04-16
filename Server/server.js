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
  console.log('Received Referer:', referer);  // Log the Referer header
  const allowedDomains = [
    'http://localhost:5173',
    'https://curseek.com',
    'http://localhost:2222', 
  ];

  if (referer && allowedDomains.some(domain => referer.startsWith(domain))) {
    next();
  } else {
    res.status(403).send('Acceso denegado. Origen no permitido.');
  }
};


// Configuración del limitador de tasa de peticiones
const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 500, // Limita cada IP a 100 solicitudes por ventana de tiempo (aquí, por 15 minutos)
  standardHeaders: true, // Devuelve la información del límite de tasa en los headers `RateLimit-*`
  legacyHeaders: false, // Deshabilita los headers `X-RateLimit-*`
  message: "Demasiadas solicitudes desde esta IP, por favor intente de nuevo más tarde.",
});

// Middleware cors
const whitelist = ['http://localhost:2222', 'https://curseek.com', 'http://localhost:5173'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin', 'User-Agent']
};

app.use(cors(corsOptions));


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
  console.log('Origin:', req.origin);
  console.log('Referer:', req.get('Referer'));
  console.error(error.message);
  res.status(500).send("Error interno del servidor");
});

// Iniciar el servidor
const PORT = process.env.PORT || 3333;
const IP = process.env.IP || '0.0.0.0';
app.listen(PORT, IP, () => {
  console.log(`Servidor escuchando en ${IP}:${PORT}`);
});
