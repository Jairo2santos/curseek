const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/courses.controller.js');

// Ruta para obtener todos los cursos
router.get('/', coursesController.getAllCourses);

// Ruta para la búsqueda de cursos
router.get('/search', coursesController.searchCourses);

// Ruta para obtener un curso específico por ID
router.get('/:id', coursesController.getSingleCourse);


module.exports = router;
