const mongoose = require('mongoose');
const normalizeText = require('../middlewares/normalize.middleware'); // Ajusta la ruta según sea necesario
const UTNCourse = require('../models/providers/utn.models'); // Ajusta la ruta según sea necesario

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/cursosApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Conectado a MongoDB"))
  .catch(err => console.error("Error al conectar a MongoDB", err));

const generateAndUpdateSlugs = async () => {
  try {
    const courses = await UTNCourse.find({}); // Obtiene todos los cursos de la colección cursos_UTN

    for (let course of courses) {
      const slug = normalizeText(course.title); // Genera el slug a partir del título
      await UTNCourse.findByIdAndUpdate(course._id, { slug }); // Actualiza el curso con el nuevo slug
      console.log(`Slug actualizado para ${course.title}: ${slug}`);
    }

    console.log("Todos los slugs han sido actualizados.");
  } catch (error) {
    console.error("Error al generar y actualizar slugs:", error);
  } finally {
    mongoose.disconnect(); // Cierra la conexión a la base de datos
  }
};

generateAndUpdateSlugs();
