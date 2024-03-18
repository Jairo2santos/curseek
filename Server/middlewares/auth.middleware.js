//auth.middleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/generals/user.models');

// Verifica el token JWT
exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(403).json({ message: 'Se requiere un token para autenticación' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

// Verifica si el usuario es administrador
exports.isAdmin = (req, res, next) => {
  if (req.userRole === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Acceso denegado. Se requiere rol de administrador' });
  }
};
exports.generatePasswordResetToken = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    // Generar token de restablecimiento de contraseña
    const resetToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Expira en una hora
    );

    // Guardar el token en el usuario
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hora desde ahora
    await user.save();
    
    // Pasar a la siguiente función para enviar el correo
    req.resetToken = resetToken;
    next();
  } catch (error) {
    console.error('Error generando el token de restablecimiento:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};