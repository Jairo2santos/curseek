// Importa tus funciones de ayuda para obtener los datos
import { fetchUTNCourses, fetchUDEMYCourses, fetchCourseraCourses } from './data-fetching';

// Middleware para Cursos de UTN
app.get('/cursos/utn', async (req, res, next) => {
  try {
    const data = await fetchUTNCourses();
    req.preloadedData = data;
    next();
  } catch (error) {
    console.error("Failed to fetch UTN courses", error);
    next(error);
  }
});

// Middleware para Cursos de UDEMY
app.get('/cursos/udemy', async (req, res, next) => {
  try {
    const data = await fetchUDEMYCourses();
    req.preloadedData = data;
    next();
  } catch (error) {
    console.error("Failed to fetch UDEMY courses", error);
    next(error);
  }
});

// Middleware para Cursos de Coursera
app.get('/cursos/coursera', async (req, res, next) => {
  try {
    const data = await fetchCourseraCourses();
    req.preloadedData = data;
    next();
  } catch (error) {
    console.error("Failed to fetch Coursera courses", error);
    next(error);
  }
});
