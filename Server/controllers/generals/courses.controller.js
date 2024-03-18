
const courseService = require('../../services/providers/udemy.services.js')


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

