require('dotenv').config(); // Asegúrate de requerir dotenv al principio
const mongoose = require('mongoose');
const fetchEdxCourses = require('./edx/saveEdxCourses');

async function loadProveedores() {
  // Usa la variable de entorno para la conexión a MongoDB
  await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  // Carga de cursos EDX
  await fetchEdxCourses();
  // Cierra la conexión a la base de datos
  mongoose.connection.close();
}

loadProveedores().catch(err => {
  console.error("Error durante la carga de proveedores:", err);
});
