const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Course = require('./models/course.models.js');
const app = express();
app.use(cors());


// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/cursosApp', { useNewUrlParser: true, useUnifiedTopology: true });

// Definición del modelo de Curso




app.get('/utn', async (req, res) => {
  const cursos = await Course.find();
  res.json(cursos);
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
