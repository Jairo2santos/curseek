const User = require('../../models/generals/user.models');
const UdemyCourse = require('../../models/providers/udemy.models');
const CourseraCourse  = require('../../models/providers/courseraCourse.model');
const utnCourse = require('../../models/providers/utn.models');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');



const authenticateUser = async (username, password) => {
  console.log(`Authenticating user: ${username}`);
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Contraseña incorrecta');
  }

  // Generar JWT

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return { user, token };
};

const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    throw new Error('Error al obtener el usuario.');
  }
}
const getUserByUsername = async (username) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    return user;
  } catch (error) {
    throw new Error('Error al obtener el perfil del usuario.');
  }
};
const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error('Error al obtener los usuarios.');
  }
};
const addFavoriteToUser = async (userId, courseId, courseType) => {
  try {
    const user = await getUserById(userId);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    user.favorites.push({ courseId, courseType });
    await user.save();
    return user;
  } catch (error) {
    throw new Error('Error al agregar a favoritos.');
  }
};
const removeFavoriteFromUser = async (userId, courseId) => {
  try {
    await User.findByIdAndUpdate(userId, { $pull: { favorites: { courseId } } });
  } catch (error) {
    throw new Error('Error al eliminar de favoritos.');
  }
};
const getFavoriteCoursesForUser = async (userId) => {
  try {
    const user = await getUserById(userId);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    // Dividir favoritos por tipo
    const udemyFavorites = user.favorites.filter(f => f.courseType === 'UDEMY').map(f => f.courseId);
    const utnFavorites = user.favorites.filter(f => f.courseType === 'UTN').map(f => f.courseId);
    const courseraFavorites = user.favorites.filter(f => f.courseType === 'COURSERA').map(f => f.courseId);

    // Recuperar cursos de las respectivas colecciones
    const udemyCourses = udemyFavorites.length ? await UdemyCourse.find({ '_id': { $in: udemyFavorites } }) : [];
    const utnCourses = utnFavorites.length ? await utnCourse.find({ '_id': { $in: utnFavorites } }) : [];
    const courseraCourses = courseraFavorites.length ? await CourseraCourse.find({ '_id': { $in: courseraFavorites } }) : [];

    // Agrega el tipo de curso y retorna la lista combinada
    const udemyCoursesWithTypes = udemyCourses.map(course => ({ ...course.toObject(), courseType: 'UDEMY' }));
    const utnCoursesWithTypes = utnCourses.map(course => ({ ...course.toObject(), courseType: 'UTN' }));
    const courseraCoursesWithTypes = courseraCourses.map(course => ({ ...course.toObject(), courseType: 'COURSERA' }));
    return [...udemyCoursesWithTypes, ...utnCoursesWithTypes, ...courseraCoursesWithTypes];

  } catch (error) {
    throw new Error('Error al obtener cursos favoritos.');
  }
};
const getUserProfile = async (username) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    return user;
  } catch (error) {
    throw new Error('Error al obtener el perfil del usuario.');
  }
};
const register = async ({ username, email, password, address, profilePicture }) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      address,
      profilePicture
    });

    await newUser.save();
    return newUser;
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    throw error; // Lanza el error para manejarlo en el controlador
  }
};
const updateUserProfile = async (userId, updatedData, newImagePath) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Si hay una nueva imagen de perfil
    if (newImagePath) {
      // Verificar y eliminar la imagen de perfil anterior si existe
      const oldImagePath = path.join(UPLOADS_DIR, user.profilePicture);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath); // Asegúrate de manejar errores aquí
      }
      // Actualizar la ruta de la imagen de perfil en los datos actualizados
      updatedData.profilePicture = newImagePath;
    }

    // Actualizar los campos del usuario con los datos proporcionados
    Object.assign(user, updatedData);
    
    // Guardar los cambios en la base de datos
    await user.save();

    return user; // O lo que necesites devolver
  } catch (error) {
    console.error('Error al actualizar el perfil del usuario:', error);
    // Asegúrate de manejar y loguear errores específicos aquí
    throw error;
  }
};


const checkIfCourseIsFavorited = async (userId, courseId) => {
  try {
    // Verificar que el courseId es válido para convertir a ObjectId
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      throw new Error('ID de curso inválido');
    }
    const objectId = new mongoose.Types.ObjectId(courseId);
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    const isFavorited = user.favorites.some(favorite => favorite.courseId.equals(objectId));
    return isFavorited;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Error al verificar si el curso está en favoritos.');
  }
};

module.exports = {
  getUserById,
  addFavoriteToUser,
  removeFavoriteFromUser,
  getFavoriteCoursesForUser,
  getAllUsers,
  authenticateUser ,
  getUserProfile,
  getUserByUsername,
  register,
  updateUserProfile,
  checkIfCourseIsFavorited,
};