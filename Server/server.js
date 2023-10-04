const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Course = require('./models/course.models.js');
const app = express();
app.use(cors());


mongoose.connect('mongodb://localhost:27017/cursosApp', { useNewUrlParser: true, useUnifiedTopology: true });

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});

app.get('/categorias', async (req, res) => {
  try {
    const categorias = await Course.distinct("category");
    res.json(categorias);
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    res.status(500).send("Error interno del servidor");
  }
});


app.get('/cursos', async (req, res) => {
  const categoria = req.query.categories;
  const page = Number(req.query.page) || 1; 
  const limit = 6; 
  const skip = (page - 1) * limit;
  let cursos;
  if (categoria) {
    totalCursos = await Course.countDocuments({ category: categoria });
    cursos = await Course.find({ category: categoria }).skip(skip).limit(limit);
  } else {
    totalCursos = await Course.countDocuments();
    cursos = await Course.find().skip(skip).limit(limit);
  }
  const totalPages = Math.ceil(totalCursos / limit);
  res.json({ courses: cursos, totalPages: totalPages  , totalCourses: totalCursos});
});
