const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/courses.controller.js');
const utnController = require('../controllers/utn.controller.js');
const udemyController = require('../controllers/udemy.controller.js'); // Asegúrate de que la extensión .js esté presente si es necesario.

// Rutas específicas primero
router.get('/utn', utnController.getUtnCourses);
router.get('/udemy', udemyController.getUdemyCourses);

// Luego las rutas de búsqueda
router.get('/search', coursesController.searchCourses);

// Ruta general para obtener todos los cursos - deberías considerar si esta ruta podría tener conflictos con las rutas parametrizadas
router.get('/', coursesController.getAllCourses);
// Finalmente, la ruta parametrizada para evitar conflictos con las anteriores
router.get('/utn/:id', utnController.getSingleCourse);
// En tu archivo de rutas de Express.js (o similar)
router.get('/udemy/:id', udemyController.getSingleUdemyCourse);




module.exports = router;