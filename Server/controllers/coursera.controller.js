const { getAllCourseraCourses, getCourseraCoursesByUniversity } = require('../services/coursera.services');

exports.getCourseraCourses = async (req, res) => {
  try {
    const courses = await getAllCourseraCourses();
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error al obtener cursos de Coursera:", error);
    res.status(500).send("Error interno del servidor");
}
};

exports.getCourseraCoursesByUni = async (req, res) => {
const { university } = req.params;
try {
const courses = await getCourseraCoursesByUniversity(university);
res.status(200).json(courses);
} catch (error) {
console.error(`Error al obtener cursos de la universidad ${university}:`, error);
res.status(500).send("Error interno del servidor");
}
};
