// user.controller.js Server\controllers\generals\user.controller.js

const userService = require('../../services/generals/user.services');
const fs = require('fs');
const path = require('path');
const { UPLOADS_DIR } = require('../../configs/uploadsDir');

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
      // Obtener usuario actual antes de actualizar para acceder a la posible imagen antigua
      const currentUser = await userService.getUserById(id);
      let oldImagePath = null;

      // Si hay una imagen actual y una nueva imagen, prepara la eliminación de la imagen antigua
      if (currentUser && currentUser.profilePicture && req.file) {
          oldImagePath = path.join(UPLOADS_DIR, currentUser.profilePicture);

          // Verifica y elimina la imagen antigua si existe
          if (fs.existsSync(oldImagePath)) {
              fs.unlinkSync(oldImagePath);
          }
      }

      // Prepara la nueva imagen para ser guardada
      if (req.file) {
          updatedData.profilePicture = req.file.filename; // Asegúrate de guardar solo el nombre del archivo o una ruta relativa
      }

      // Procede con la actualización del usuario
      const updatedUser = await userService.updateUserProfile(id, updatedData);

      res.status(200).json({ message: 'Perfil actualizado con éxito', user: updatedUser });
  } catch (error) {
      console.error(`Error al actualizar el usuario con ID ${id}: ${error.message}`, error);

      // Intenta eliminar la nueva imagen subida si el proceso de actualización falla, para evitar archivos huérfanos
      if (req.file) {
          const imagePath = path.join(UPLOADS_DIR, req.file.filename);
          if (fs.existsSync(imagePath)) {
              fs.unlinkSync(imagePath);
          }
      }

      res.status(500).json({ message: 'Error al actualizar el perfil', error: error.message });
  }
};

exports.register = async (req, res) => {
  try {
    const newUser = req.body;

    if (req.file) {
      newUser.profilePicture = req.file.path; 
    } else {
      newUser.profilePicture = '/uploads/student.png';
    }

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


