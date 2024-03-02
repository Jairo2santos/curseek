// routes/api.js
const express = require('express');
const router = express.Router();

// Importa tus routers específicos
const coursesRoutes = require('./courses.js');
const categoriesRoutes = require('./categories.js');
const usersRoutes = require('./users.js');
const blogsRoutes = require('./blogs.js');

// Aplica los routers al router de la API
router.use('/cursos', coursesRoutes);
router.use('/categorias', categoriesRoutes);
router.use('/users', usersRoutes);
router.use('/blogs', blogsRoutes);

module.exports = router;
