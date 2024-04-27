
const courseService = require('../../services/providers/udemy.services.js')
const CourseModel = require('../../models/generals/unifiedCourse.model.js'); // Asegúrate de que la ruta es correcta


exports.getAllCourses = async (req, res) => {
    const categories = req.query.categories; 
    const filterType = req.query.filter;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10; 
    try {
        const result = await courseService.getAllCoursesService({ categories, filterType, page, limit });
        res.status(200).json({
            courses: result.courses,
            totalPages: result.totalPages,
            totalCourses: result.totalCourses
        });
    } catch (error) {
        console.error("Error al obtener los cursos:", error);
        res.status(500).send("Error interno del servidor");
    }
}

exports.getAllCourseSlugs = async (req, res) => {
    try {
      const courses = await CourseModel.find({}, 'slug source -_id').lean();
      res.json({ slugs: courses.map(course => ({ slug: course.slug, source: course.source })) });
    } catch (error) {
      console.error("Error al obtener slugs de los cursos:", error);
      res.status(500).send('Error interno del servidor');
    }
};
