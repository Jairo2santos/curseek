//loadProveedores.js
const mongoose = require('mongoose');
//const saveUdemyCourses = require('./udemy/saveUdemyCourses');
const fetchEdxCourses = require('./edx/saveEdxCourses'); 
async function loadProveedores() {
  // Conexión a MongoDB
  await mongoose.connect('mongodb://localhost:27017/cursosApp', { useNewUrlParser: true, useUnifiedTopology: true });
  // Carga de cursos Udemy
  //await saveUdemyCourses();
  // Carga de cursos EDX
  await fetchEdxCourses();
  // Cierra la conexión a la base de datos
  mongoose.connection.close();
}

loadProveedores().catch(err => {
  console.error("Error durante la carga de proveedores:", err);
});
