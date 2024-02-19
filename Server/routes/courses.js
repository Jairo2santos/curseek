// courses.js
const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/courses.controller.js');
const utnController = require('../controllers/utn.controller.js');
const udemyController = require('../controllers/udemy.controller.js'); 
const buscadorController = require('../controllers/buscador.controller');
const courseraController = require('../controllers/coursera.controller');

// Rutas específicas primero
router.get('/utn', utnController.getUtnCourses);
router.get('/udemy', udemyController.getUdemyCourses);
// Luego las rutas de búsqueda
router.get('/search', buscadorController.searchCourses);
// Ruta general para obtener todos los cursos - deberías considerar si esta ruta podría tener conflictos con las rutas parametrizadas
router.get('/', coursesController.getAllCourses);
//  la ruta parametrizada para evitar conflictos con las anteriores
router.get('/utn/:slug', utnController.getSingleCourse);
router.get('/udemy/:slug', udemyController.getSingleUdemyCourse);
// Ruta para obtener todos los cursos de Coursera
router.get('/coursera', courseraController.getCourseraCourses);
router.get('/coursera/:university', courseraController.getCourseraCoursesByUni);

  module.exports = router;