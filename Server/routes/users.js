const express = require('express');
const router = express.Router();
const userController = require('../controllers/generals/user.controller');
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');

// Rutas públicas
router.post('/login', userController.login);
router.post('/register', userController.register);

// Ruta protegida para perfil de usuario
router.get('/profile/username/:username', verifyToken, userController.getUserProfileByUsername);
router.get('/profile/id/:userId', verifyToken, userController.getUserProfileById);
router.put('/profile/:id', verifyToken, userController.updateUserProfile);

// Rutas protegidas para cursos favoritos (asumiendo que todos los usuarios autenticados pueden usar estas rutas)
router.post('/favorites/add', verifyToken, userController.addFavoriteCourse);
router.post('/favorites/remove', verifyToken, userController.removeFavoriteCourse);
router.get('/favorites/:userId', verifyToken, userController.getFavoriteCourses);
router.get('/favorites/check/:userId/:courseId', verifyToken, userController.checkFavoriteCourse);

// Rutas protegidas para administradores
router.get('/', verifyToken, isAdmin, userController.getAllUsers); // Solo el admin puede obtener todos los usuarios
router.get('/:userId', verifyToken, isAdmin, userController.getUserById); // Solo el admin puede obtener información de un usuario específico

module.exports = router;
