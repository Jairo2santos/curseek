// user.controller.js Server\controllers\generals\user.controller.js

const userService = require('../../services/generals/user.services');
const crypto = require('crypto');
const nodemailerConfig = require('../../configs/nodemailerConfig'); // Asegúrate de tener este archivo configurado

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener los usuarios:", error.message);
    res.status(500).send("Error interno del servidor");
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const { user, token } = await userService.authenticateUser(username, password);
    res.json({
      message: 'Inicio de sesión exitoso',
      token,
      username: user.username,
      role: user.role,
      userId: user._id, 
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

exports.getUserProfileByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await userService.getUserByUsername(username);
    res.status(200).json(user);
  } catch (error) {
    res.status(error.status || 500).send(error.message);
  }
};

exports.getUserProfileById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await userService.getUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(error.status || 500).send(error.message);
  }
};

exports.updateUserProfile = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    await userService.updateUserProfile(id, updatedData);
    res.status(200).send('Perfil actualizado con éxito');
  } catch (error) {
    res.status(error.status || 500).send(error.message);
  }
};

exports.register = async (req, res) => {
  try {
    const newUser = req.body;
    const user = await userService.register(newUser);
    res.status(201).json({ message: 'Usuario creado exitosamente', user });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el usuario', error: error.message });
  }
};

exports.addFavoriteCourse = async (req, res) => {
  const { userId, courseId, courseType } = req.body;
  try {
    await userService.addFavoriteToUser(userId, courseId, courseType);
    res.status(200).send('Curso agregado a favoritos');
  } catch (error) {
    res.status(error.status || 500).send(error.message);
  }
};

exports.getUserProfile = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await userService.getUserProfile(username);
    res.status(200).json(user);
  } catch (error) {
    res.status(error.status || 500).send(error.message);
  }
};

exports.removeFavoriteCourse = async (req, res) => {
  const { userId, courseId } = req.body;
  try {
    await userService.removeFavoriteFromUser(userId, courseId);
    res.status(200).send('Curso eliminado de favoritos');
  } catch (error) {
    res.status(error.status || 500).send(error.message);
  }
};

exports.checkFavoriteCourse = async (req, res) => {
  const { userId, courseId } = req.params;
  try {
    const isFavorited = await userService.checkIfCourseIsFavorited(userId, courseId);
    res.status(200).json({ isFavorited });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getFavoriteCourses = async (req, res) => {
  const userId = req.params.userId;
  try {
    const favoriteCourses = await userService.getFavoriteCoursesForUser(userId);
    res.json(favoriteCourses);
  } catch (error) {
    res.status(error.status || 500).send(error.message);
  }
};

exports.getUserById = async (req, res) => {
  const userId = req.params.userId; 
  try {
    const user = await userService.getUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(error.status || 500).send(error.message);
  }
};

exports.updateUserProfile = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const user = await userService.updateUserProfile(id, updatedData);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.solicitarRestablecimiento = async (req, res) => {
  const { email } = req.body;
  const user = await userService.getUserByEmail(email); // Asegúrate de implementar este método en tu userService

  if (!user) {
    return res.status(404).send('Usuario no encontrado.');
  }

  const token = crypto.randomBytes(20).toString('hex');
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hora

  await user.save();

  nodemailerConfig.enviarCorreoRestablecimiento(email, token); // Asegúrate de implementar este método en tu configuración de Nodemailer

  res.send('Correo de restablecimiento enviado.');
};

exports.restablecerContrasena = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await userService.getUserByResetPasswordToken(token); // Implementa este método

  if (!user || user.resetPasswordExpires < Date.now()) {
    return res.status(400).send('Token de restablecimiento no válido o expirado.');
  }

  user.password = await userService.hashPassword(password); // Implementa este método para hashear la contraseña
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  res.send('Contraseña actualizada con éxito.');
};
exports.solicitarRestablecimiento = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userService.getUserByEmail(email);
    if (!user) {
      return res.status(404).send('Usuario no encontrado.');
    }

    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hora

    await user.save();
    nodemailerConfig.enviarCorreoRestablecimiento(email, token);

    res.send('Correo de restablecimiento enviado.');
  } catch (error) {
    console.error("Error en solicitarRestablecimiento:", error.message);
    res.status(500).send("Error interno del servidor");
  }
};