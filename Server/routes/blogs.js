const express = require('express');
const router = express.Router();
const blogsController = require('../controllers/generals/blogs.controller');
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');

// Ruta para crear un nuevo blog (protegida, solo admin)
router.post('/', verifyToken, isAdmin, blogsController.createBlog);

// Actualización de la ruta para actualizar un blog por slug
router.put('/slug/:slug', verifyToken, isAdmin, blogsController.updateBlogBySlug);

// Actualización de la ruta para eliminar un blog por slug
router.delete('/slug/:slug', verifyToken, isAdmin, blogsController.deleteBlogBySlug);

// Rutas que no requieren autenticación
router.get('/', blogsController.getAllBlogs);

// Actualización de la ruta para obtener un blog por slug
router.get('/slug/:slug', blogsController.getBlogBySlug);

module.exports = router;
