<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const Course = require('../models/course.models.js');

router.get('/', async (req, res) => {
    const categoria = req.query.categories;
    const filterType = req.query.filter;
    const page = Number(req.query.page) || 1;
    const limit = 6;
    const skip = (page - 1) * limit;
    let query = {};

    if (categoria) {
        query.category = categoria;
    }
    try {
        const totalCursos = await Course.countDocuments(query);
        let cursos = await Course.find(query).skip(skip).limit(limit);

        // Si hay un filtro aplicado, clasificar los cursos de acuerdo al filtro
        if (filterType) {
            switch (filterType) {
                case "priceAsc":
                    cursos.sort((a, b) => parseFloat(a.price.replace(/\D/g, '')) - parseFloat(b.price.replace(/\D/g, '')));
                    break;
                case "priceDesc":
                    cursos.sort((a, b) => parseFloat(b.price.replace(/\D/g, '')) - parseFloat(a.price.replace(/\D/g, '')));
                    break;
                case "dateDesc":
                    cursos.sort((a, b) => new Date(b.startDate.split('\n')[1].trim()) - new Date(a.startDate.split('\n')[1].trim()));
                    break;
            }
        }
        const totalPages = Math.ceil(totalCursos / limit);
        res.json({ courses: cursos, totalPages: totalPages, totalCourses: totalCursos });
    } catch (error) {
        console.error("Error al obtener los cursos:", error);
        res.status(500).send("Error interno del servidor");
    }
});

module.exports = router;
=======
// courses.js
const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/generals/courses.controller.js');
const utnController = require('../controllers/providers/utn.controller.js');
const udemyController = require('../controllers/providers/udemy.controller.js'); 
const buscadorController = require('../controllers/generals/buscador.controller.js');
const courseraController = require('../controllers/providers/coursera.controller.js');

// Rutas específicas primero
router.get('/utn', utnController.getUtnCourses);
router.get('/udemy', udemyController.getUdemyCourses);
// Luego las rutas de búsqueda
router.get('/search', buscadorController.searchCourses);
// Ruta general para obtener todos los cursos 
router.get('/', coursesController.getAllCourses);
//  la ruta parametrizada CURSO
router.get('/utn/:slug', utnController.getSingleCourse);
router.get('/udemy/:slug', udemyController.getSingleUdemyCourse);
router.get('/coursera/:slug', courseraController.getSingleCourseraCourse);
router.get('/coursera/universidad/:university', courseraController.getCourseraCoursesByUni);
router.get('/coursera/universidad/:university/profesores', courseraController.getCourseraProfessorsByUni);

// Ruta para obtener todos los cursos de Coursera
router.get('/coursera', courseraController.getCourseraCourses);


  module.exports = router;
>>>>>>> developer
