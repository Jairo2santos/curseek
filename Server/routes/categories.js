const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categories.controller.js');

router.get('/', categoriesController.getCategories);

module.exports = router;
