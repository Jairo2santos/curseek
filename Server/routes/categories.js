//routes/categories.js
const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categories.controller.js');

// rutas para categorías de UTN ,Udemy y coursera
router.get('/utn', categoriesController.getUTNCategories);
router.get('/udemy', categoriesController.getUdemyCategories);
router.get('/coursera', categoriesController.getCourseraCategories);

module.exports = router;