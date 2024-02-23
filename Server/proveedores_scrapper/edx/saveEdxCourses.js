const Course = require('../../models/edx.models'); // Asegúrate de que la ruta sea correcta

const axios = require('axios');

async function fetchEdxCourses() {
    let nextPageUrl = 'https://courses.edx.org/api/courses/v1/courses/?page=1&page_size=2'; // Inicia con la primera página
  
    const headers = {
      'Accept': 'application/json',
      'Authorization': 'Basic ZG9ibGVqYWlyb0BnbWFpbC5jb206UmFzdGEuMTIz',
      'X-CSRFToken': 'QzfNISgcL0yjaxmaW0jRt5onfxx7nV0OwBRMra02m6iFpJPZTqUamnDwakNaOUKK',
    };
  
    while (nextPageUrl) {
      try {
        const response = await axios.get(nextPageUrl, { headers });
        const coursesData = response.data.results;
        
        for (const data of coursesData) {
          await Course.updateOne(
            { course_id: data.id },
            { $set: {
                name: data.name,
                description: data.short_description || '',
                start_date: data.start ? new Date(data.start) : undefined,
                end_date: data.end ? new Date(data.end) : undefined,
                enrollment_start: data.enrollment_start ? new Date(data.enrollment_start) : undefined,
                enrollment_end: data.enrollment_end ? new Date(data.enrollment_end) : undefined,
                pacing_type: data.pacing,
                effort: data.effort,
                course_image: data.media.course_image.uri || '',
                number: data.number,
                org: data.org,
                mobile_available: data.mobile_available || false,
                // Añade otros campos necesarios aquí
              }
            },
            { upsert: true }
          );
        }
        
        console.log('Página de cursos de EDX cargada correctamente.');
        nextPageUrl = response.data.pagination.next || null; // Actualiza la URL de la siguiente página
      } catch (error) {
        console.error('Error fetching EDX courses:', error);
        nextPageUrl = null; // Detiene el bucle si hay un error
      }
    }
  }
  
  module.exports = fetchEdxCourses;