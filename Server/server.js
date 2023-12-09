const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Rutas
const coursesRoutes = require('./routes/courses.js');
const categoriesRoutes = require('./routes/categories.js');

app.use(cors());

// Montar las rutas en la aplicación
app.use('/cursos', coursesRoutes);
app.use('/categorias', categoriesRoutes);

// Conectar con MongoDB
mongoose.connect('mongodb://localhost:27017/cursosApp', { useNewUrlParser: true, useUnifiedTopology: true });

// Manejador de errores globales
app.use((error, req, res, next) => {
  console.error(error.message);
  res.status(500).send("Error interno del servidor");
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});