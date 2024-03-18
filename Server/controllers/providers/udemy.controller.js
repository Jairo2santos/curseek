// controllers/udemy.controller.js
const { getUdemyCoursesService, getSingleUdemyCourseBySlugService } = require('../../services/providers/udemy.services'); // Asegúrate de que la ruta sea correcta

exports.getUdemyCourses = async (req, res) => {
    const { page = 1, limit = 10, category, filter } = req.query;
    try {
        const options = {
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
            category,
            filterType: filter
        };
        const result = await getUdemyCoursesService(options.category, options.page, options.limit, options.filterType);
        res.status(200).json({
            courses: result.courses,
            totalPages: result.totalPages,
            totalCourses: result.totalCourses,
            currentPage: options.page
        });
    } catch (error) {
        console.error("Error al obtener cursos de Udemy:", error);
        res.status(500).send("Error interno del servidor");
    }
};

exports.getSingleUdemyCourse = async (req, res) => {
    const { slug } = req.params;
    try {
        const course = await getSingleUdemyCourseBySlugService(slug);
        if (!course) {
            return res.status(404).send("Curso no encontrado");
        }
        res.json(course);
    } catch (error) {
        console.error("Error completo:", error);
        res.status(500).send("Error interno del servidor");
    }
};