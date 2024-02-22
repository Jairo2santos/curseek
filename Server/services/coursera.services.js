const CourseraCourse = require('../models/courseraCourse.model');

exports.getAllCourseraCourses = async (page = 1, limit = 10) => {
  try {
    const courses = await CourseraCourse.find()
                                         .skip((page - 1) * limit)
                                         .limit(limit);
    const totalCourses = await CourseraCourse.countDocuments();
    return {
      courses: courses,
      totalPages: Math.ceil(totalCourses / limit),
      totalCourses: totalCourses
    };
  } catch (error) {
    console.error("Error al obtener cursos de Coursera:", error);
    throw error;
  }
};


exports.getCourseraCoursesByUniversity = async (university) => {
  try {
    return await CourseraCourse.find({ university });
  } catch (error) {
    console.error(`Error al obtener cursos de la universidad ${university}:`, error);
    throw error;
  }
};

exports.getCourseraCoursesByCategory = async (category, page = 1, limit = 10) => {
  try {
      const query = { mainCategory: category }; // Ajusta este query según cómo estén estructurados tus datos
      const courses = await CourseraCourse.find(query)
                                           .skip((page - 1) * limit)
                                           .limit(limit);
      const totalCourses = await CourseraCourse.countDocuments(query);
      return {
          courses: courses,
          totalPages: Math.ceil(totalCourses / limit),
          totalCourses: totalCourses
      };
  } catch (error) {
      console.error(`Error al obtener cursos por categoría ${category}:`, error);
      throw error;
  }
};


exports.getSingleCourseraCourseBySlug = async (slug) => {
  try {
    const course = await CourseraCourse.findOne({ slug: slug });
    return course;
  } catch (error) {
    console.error("Error al obtener el curso de Coursera por slug:", error);
    throw error;
  }
};
