const CourseraCourse = require('../models/courseraCourse.model');

exports.getAllCourseraCourses = async () => {
  try {
    return await CourseraCourse.find();
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
