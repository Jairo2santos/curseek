// buscador.controller.js

const { searchCourses } = require('../services/buscador.services');

exports.searchCourses = async (req, res) => {
  const { q, all } = req.query;
  try {
    const courses = await searchCourses(q, all === 'true');
    res.json(courses);
  } catch (error) {
    console.error("Error al buscar cursos:", error);
    res.status(500).send("Error interno del servidor");
  }
};