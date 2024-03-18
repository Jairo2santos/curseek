const express = require('express');
const router = express.Router();
const userController = require('../controllers/generals/user.controller');
const { verifyToken, isAdmin , generatePasswordResetToken} = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware'); // Asegúrate de que la ruta sea correcta

// Rutas auth
router.post('/login', userController.login);
router.post('/register', upload.single('profilePicture'), userController.register);
router.put('/profile/:id', verifyToken, upload.single('profilePicture'), userController.updateUserProfile);
router.post('/password-recovery', generatePasswordResetToken, userController.sendPasswordResetEmail);
router.post('/email-user-verification', userController.verifyUserByEmail);
router.post('/reset-password', userController.resetPassword);

//router.get('/send-test-email', userController.sendTestEmail);


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

