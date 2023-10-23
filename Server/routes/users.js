const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.getAllUsers);  // Aquí es donde defines la ruta GET para /users
router.post('/login', userController.login);
router.get('/profile/:username', userController.getUserProfile);
router.put('/profile/:id', userController.updateUserProfile); // Aquí es donde defines la ruta PUT para actualizar el perfil
router.post('/register', userController.register);


module.exports = router;