const User = require('../models/user.models');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        res.status(500).send("Error interno del servidor");
    }
};


exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(400).send('Usuario o contraseña incorrectos');
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).send('Error interno del servidor');
  }
};

exports.getUserProfile = async (req, res) => {
    const { username } = req.params;
    
    try {
        const user = await User.findOne({ username: username });
        
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).send("Usuario no encontrado");
        }
    } catch (error) {
        console.error("Error al obtener el perfil del usuario:", error);
        res.status(500).send("Error interno del servidor");
    }
};


exports.updateUserProfile = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    await User.findByIdAndUpdate(id, updatedData);
    res.status(200).send('Perfil actualizado con éxito');
  } catch (error) {
    console.error('Error al actualizar el perfil del usuario:', error);
    res.status(500).send('Error interno del servidor');
  }
};
exports.register = async (req, res) => {
  const { username, email, password, address, profilePicture } = req.body;
  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('El nombre de usuario ya está en uso');
    }
    const newUser = new User({
      username,
      email,
      password, 
      address,           
      profilePicture 

    });
    await newUser.save();
    res.status(201).send('Usuario creado exitosamente');
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).send('Error interno del servidor');
  }
};