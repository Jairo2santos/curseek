const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();
const helmet = require('helmet');
const compression = require('compression');
const apiRouter = require('./routes/api');
const path = require('path');

// Middlewares
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3333'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Permite el envío de cookies y credenciales de autenticación
}));
app.use('/api/users/uploads', (req, res, next) => {
  res.header('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
}, express.static(path.join(__dirname, 'uploads')));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());

// Montar las rutas /api y uploasds
app.use('/api', apiRouter);
app.use('/api/users/uploads', express.static(path.join(__dirname, 'uploads')));

// Conectar con MongoDB
const db = mongoose.connection;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

db.on('error', (err) => {
  console.error("Error conectando a MongoDB:", err);
});

db.once('open', () => {
  console.log("Conexión exitosa a MongoDB");
});

// Manejador de errores globales
app.use((error, req, res, next) => {
  console.error(error.message);
  res.status(500).send("Error interno del servidor");
});

// Iniciar el servidor en el puerto definido en .env o en el 3333 por defecto
const PORT = process.env.PORT || 3333;
const IP = process.env.IP || '0.0.0.0';

app.listen(PORT, IP, () => {
  console.log(`Servidor escuchando en ${IP}:${PORT}`);
});

