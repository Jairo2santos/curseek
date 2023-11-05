const UTNCourse = require('../models/utn.models.js'); // Modelo para los cursos UTN

// Servicio para obtener un curso único de UTN por ID
exports.getSingleUTNCourseService = async (id) => {
    return await UTNCourse.findById(id);
};

exports.getUTNCoursesService = async (category, page, limit) => {
    let query = {};
    if (category) {
        query.category = category;
    }

    const totalCourses = await UTNCourse.countDocuments(query);

    let courses = await UTNCourse.find(query)
        .skip((page - 1) * limit)
        .limit(limit);

    return {
        courses: courses,
        totalPages: Math.ceil(totalCourses / limit),
        totalCourses: totalCourses
    };
};

// Servicio para buscar cursos en UTN
exports.searchUTNCoursesService = async (searchQuery) => {
    return await UTNCourse.find({
        title: { $regex: new RegExp(searchQuery, 'i') }
    });
};
