const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
// Otras rutas
router.post('/login', userController.login);
router.post('/register', userController.register);

// Rutas para perfil de usuario
router.get('/profile/username/:username', userController.getUserProfileByUsername); // Obtiene perfil por nombre de usuario
router.get('/profile/id/:userId', userController.getUserProfileById); // Obtiene perfil por ID
router.put('/profile/:id', userController.updateUserProfile); // Actualiza perfil

// Rutas para cursos favoritos
router.post('/favorites/add', userController.addFavoriteCourse);
router.post('/favorites/remove', userController.removeFavoriteCourse);
router.get('/favorites/:userId', userController.getFavoriteCourses); // Obtiene cursos favoritos por ID de usuario
router.get('/favorites/check/:userId/:courseId', userController.checkFavoriteCourse);

// Rutas generales de usuario
router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getUserById); // Obtiene un usuario por ID



module.exports = router;