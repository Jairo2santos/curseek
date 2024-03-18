<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const Course = require('../models/course.models.js');

router.get('/', async (req, res) => {
  try {
    const categorias = await Course.distinct("category");
    res.json(categorias);
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    res.status(500).send("Error interno del servidor");
  }
});
=======
//routes/categories.js
const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/generals/categories.controller.js');

// rutas para categorías de UTN ,Udemy y coursera
router.get('/utn', categoriesController.getUTNCategories);
router.get('/udemy', categoriesController.getUdemyCategories);
router.get('/coursera', categoriesController.getCourseraCategories);
>>>>>>> developer

module.exports = router;