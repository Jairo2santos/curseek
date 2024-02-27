const express = require('express');
const router = express.Router();
const blogsController = require('../controllers/generals/blogs.controller');
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware'); // Asegúrate de ajustar la ruta según tu estructura

// Ruta para crear un nuevo blog (protegida, solo admin)
router.post('/', verifyToken, isAdmin, blogsController.createBlog);

// En tu archivo de rutas
router.put('/:blogId', verifyToken, isAdmin, blogsController.updateBlogById);


// Ruta para eliminar un blog (protegida, solo admin)
router.delete('/:blogId', verifyToken, isAdmin, blogsController.deleteBlogById);

// Rutas que no requieren autenticación, como obtener blogs, pueden no usar verifyToken ni isAdmin
router.get('/', blogsController.getAllBlogs);
router.get('/:blogId', blogsController.getBlogById);




module.exports = router;
