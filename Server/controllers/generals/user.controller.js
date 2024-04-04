// user.controller.js Server\controllers\generals\user.controller.js

const userService = require('../../services/generals/user.services');
const fs = require('fs');
const path = require('path');
const { UPLOADS_DIR } = require('../../configs/uploadsDir');
const User = require('../../models/generals/user.models');
const resetToken = require('../../middlewares/auth.middleware')
const jwt = require('jsonwebtoken');


const mailjet = require('node-mailjet').apiConnect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_API_SECRET
);


// exports.sendTestEmail = async (req, res) => {
//   // Datos de prueba
//   const email = 'pinto2sparedes@gmail.com'; // Correo actualizado para pruebas
//   const resetLink = 'http://localhost:5173/password-recovery?token=test-token';

//   try {
//     const result = await mailjet
//       .post('send', { version: 'v3.1' })
//       .request({
//         Messages: [{
//           From: {
//             Email: "recovery@curseek.com",
//             Name: "Curseek Recovery"
//           },
//           To: [{
//             Email: email,
//             Name: "Test User"
//           }],
//           Subject: "Test de Recuperación de Contraseña",
//           TextPart: "Esto es un test, ignora este mensaje.",
//           HTMLPart: `<p>Esto es un test, para restablecer tu contraseña usa este <a href="${resetLink}">enlace</a>.</p>`
//         }]
//       });

//     console.log(result.body);
//     return res.status(200).json({ message: 'Correo de test enviado correctamente.' });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Error al enviar el correo de test.' });
//   }
//};

exports.sendPasswordResetEmail = async (req, res) => {
  const { email } = req.body;
  //console.log('Reset Token:', req.resetToken);
  const resetToken = req.resetToken; // Asegúrate de que este token se genera correctamente
  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

  try {
    const result = await mailjet
      .post('send', { version: 'v3.1' })
      .request({
        Messages: [
          {
            From: {
              Email: "recovery@curseek.com",
              Name: "Curseek Recovery"
            },
            To: [
              {
                Email: email,
                Name: "usuario" 
              }
            ],
            Subject: "Recuperación de Contraseña",
            TextPart: `Estimado usuario, hemos recibido una solicitud para restablecer tu contraseña en Curseek. Por favor, sigue el enlace para establecer una nueva contraseña. Si no has solicitado esto, puedes ignorar este mensaje. Por favor, no respondas a este correo electrónico. ${resetLink}`,
            HTMLPart: `
            <html>
            <body style="font-family: Arial, sans-serif; background-color: #f2f4f8; padding: 20px; color: #333;">
              <div style="max-width: 600px; margin: auto; padding: 20px; background-color: #ffffff; border-radius: 10px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                <h2 style="color: #5A67D8; text-align: center;">Restablece tu contraseña</h2>
                <p>Hola,</p>
                <p>Has solicitado restablecer tu contraseña para tu cuenta en Curseek. Por favor, haz clic en el botón de abajo para establecer una nueva contraseña.</p>
                <div style="text-align: center; margin: 20px;">
                  <a href="${resetLink}" style="background-color: #5A67D8; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Restablecer Contraseña</a>
                </div>
                <p>Si tú no solicitaste cambiar tu contraseña, por favor ignora este correo.</p>
                <p>Este es un mensaje automático, por favor no respondas a este correo electrónico.</p>
                <hr style="margin-top: 30px; border: 0; border-top: 1px solid #e2e8f0;">
                <p style="text-align: center; color: #718096; font-size: 14px; margin-top: 30px;">&copy; Curseek. Todos los derechos reservados.</p>
              </div>
            </body>
            </html>
            `
          }
        ]
      });

    console.log(result.body);
    res.status(200).send('Se ha enviado un correo electrónico de recuperación.');
  } catch (err) {
    console.error(err.statusCode, err.message);
    res.status(500).send('Error al enviar el correo de recuperación de contraseña.');
  }
};


// En tu user.controller.js
exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;
  try {
    // Verificar el token y obtener el ID del usuario
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Actualizar la contraseña del usuario
    const updatedUser = await userService.updateUserProfile(userId, { password });

    res.status(200).json({ message: 'Contraseña actualizada con éxito' });
  } catch (error) {
    // Asegúrate de manejar los errores adecuadamente
    console.error(error);
    res.status(500).json({ message: 'Error al restablecer la contraseña' });
  }
};

exports.verifyUserByEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userService.getUserByEmail(email);
    if (user) {
      res.json({ userExists: true });
    } else {
      // Aquí devolvemos una respuesta 200 con información de que el usuario no existe,
      // en lugar de un error 404, para hacerlo más claro.
      res.json({ userExists: false, message: 'No se encontró una cuenta con ese correo electrónico.' });
    }
  } catch (error) {
    // Aquí manejaríamos errores reales del servidor, como problemas de conexión con la base de datos
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

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
  const { login, password } = req.body;
  try {
    const { user, token } = await userService.authenticateUser(login, password);
    res.json({
      message: 'Inicio de sesión exitoso',
      token,
      username: user.username,
      role: user.role,
      userId: user._id,
    });
  } catch (error) {
    const status = error.statusCode || 500;
    res.status(status).json({ message: error.message });
  }
};



exports.validateToken = (req, res) => {
  // Asumiendo que el token viene en el header de autorización
  const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
  if (!token) {
    return res.status(403).json({ message: 'No se proporcionó un token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Si el token es válido, devuelve un estado de éxito
    res.status(200).json({ valid: true, userId: decoded.userId });
  } catch (error) {
    // Si hay un error, como un token expirado, devuelve un error
    res.status(401).json({ valid: false, message: 'Token inválido' });
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
    // Verificar unicidad del nombre de usuario y correo electrónico
    if (updatedData.username) {
      const existingUserByUsername = await User.findOne({ username: updatedData.username, _id: { $ne: id } });
      if (existingUserByUsername) {
        return res.status(400).json({ field: 'username', message: 'El nombre de usuario ya está en uso.' });
      }
    }

    if (updatedData.email) {
      const existingUserByEmail = await User.findOne({ email: updatedData.email, _id: { $ne: id } });
      if (existingUserByEmail) {
        return res.status(400).json({ field: 'email', message: 'El correo electrónico ya está en uso.' });
      }
    }

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
  // Extraer username y email del cuerpo de la solicitud
  const { username, email } = req.body;
  
  try {
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ field: 'username', message: 'El nombre de usuario ya está en uso.' });
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ field: 'email', message: 'El correo electrónico ya está en uso.' });
    }

    // Continuar con la creación del nuevo usuario
    let newUser = req.body;

    if (req.file) {
      newUser.profilePicture = req.file.path; 
    } else {
      newUser.profilePicture = '/uploads/student.png';
    }

    const user = await userService.register(newUser);
    
    res.status(201).json({ message: 'Usuario creado exitosamente', user });
  } catch (error) {
    console.error(`Error al registrar el usuario: ${error.message}`);
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

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.userId; 

    
    await User.findByIdAndDelete(userId);
    
    res.status(200).json({ message: 'Cuenta eliminada con éxito.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la cuenta.' });
  }
};

