// buscador.services.js
const UnifiedCourse = require('../../models/generals/unifiedCourse.model');

// Función para buscar cursos basada en una cadena de búsqueda
const searchCourses = async (query, all = false) => {
  try {
    const queryOptions = {
      $text: { $search: query }
    };

    const findQuery = UnifiedCourse.find(queryOptions, { score: { $meta: "textScore" } })
      .sort({ score: { $meta: "textScore" } });

    if (!all) {
      findQuery.limit(15); // Limitar a 15 resultados
    }

    return await findQuery;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  searchCourses,
};