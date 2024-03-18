const UdemyCourse = require('../../models/providers/udemy.models');

// Servicio para obtener un curso único de Udemy por ID
exports.getSingleUdemyCourseBySlugService = async (slug) => {
    try {
        return await UdemyCourse.findOne({ slug });
    } catch (error) {
        console.error("Error al obtener el curso de Udemy:", error);
        throw error;
    }
};

// Servicio para obtener todos los cursos de Udemy
exports.getUdemyCoursesService = async (category, page, limit) => {
    let query = {};
    if (category) {
        query['primary_category.title'] = category;
    }
    const totalCourses = await UdemyCourse.countDocuments(query);
    let courses = await UdemyCourse.find(query)
        .skip((page - 1) * limit)
        .limit(limit);
    return {
        courses: courses,
        totalPages: Math.ceil(totalCourses / limit),
        totalCourses: totalCourses
    };
};

// Servicio para buscar cursos en Udemy
exports.searchUdemyCourses = async (req, res) => {
    const { query } = req.query; 
    try {
        const courses = await searchUdemyCoursesService(query);
        res.status(200).json(courses);
    } catch (error) {
        console.error("Error al buscar cursos de Udemy:", error);
        res.status(500).send("Error interno del servidor");
    }
};