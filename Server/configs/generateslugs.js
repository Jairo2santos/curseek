const mongoose = require('mongoose');
const normalizeText = require('../middlewares/normalize.middleware'); // Asegúrate de que la ruta sea correcta
const CourseraCourse = require('../models/courseraCourse.model'); // Asegúrate de que la ruta al modelo sea correcta

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/cursosApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Conectado a MongoDB"))
  .catch(err => console.error("Error al conectar a MongoDB", err));

const generateAndUpdateSlugs = async () => {
  try {
    const courses = await CourseraCourse.find({}); // Obtiene todos los cursos

    for (let course of courses) {
      const slug = normalizeText(course.title); // Genera el slug a partir del título
      await CourseraCourse.findByIdAndUpdate(course._id, { slug }); // Actualiza el curso con el nuevo slug
      console.log(`Slug actualizado para ${course.title}: ${slug}`);
    }

    console.log("Todos los slugs han sido actualizados.");
  } catch (error) {
    console.error("Error al generar y actualizar slugs:", error);
  } finally {
    mongoose.disconnect();
  }
};

generateAndUpdateSlugs();
