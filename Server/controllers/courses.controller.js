const courseService = require('../services/courses.services.js');


exports.getSingleCourse = async (req, res) => {
    const { id } = req.params;

    try {
        const course = await courseService.getSingleCourseService(id);
        if (course) {
            res.status(200).json(course);
        } else {
            res.status(404).send("Curso no encontrado");
        }
    } catch (error) {
        console.error("Error al obtener el curso:", error);
        res.status(500).send("Error interno del servidor");
    }
};

exports.getAllCourses = async (req, res) => {
    const categoria = req.query.categories;
    const filterType = req.query.filter;
    const page = Number(req.query.page) || 1; 
    const limit = 6;

    try {
        const result = await courseService.getAllCoursesService(filterType, categoria, page, limit);
        res.json(result);
    } catch (error) {
        console.error("Error al obtener los cursos:", error);
        res.status(500).send("Error interno del servidor");
    }
};

exports.searchCourses = async (req, res) => {
    const query = req.query.q;

    try {
        const courses = await courseService.searchCoursesService(query);
        res.status(200).json(courses);
    } catch (error) {
        console.error("Error al buscar cursos:", error);
        console.error("Detalles del error:", error.message, error.stack);
        res.status(500).send("Error interno del servidor");
    }
};
