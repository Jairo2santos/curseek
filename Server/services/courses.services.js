const Course = require('../models/course.models.js');

exports.updateCourseTitleService = async (id, title) => {
    await Course.findByIdAndUpdate(id, { title });
};

exports.getSingleCourseService = async (id) => {
    return await Course.findById(id);
};

exports.getAllCoursesService = async (filter, category, page, limit) => {
    let query = {};

    if (category) {
        query.category = category;
    }

    const totalCursos = await Course.countDocuments(query);
    let cursos = await Course.find(query).skip((page - 1) * limit).limit(limit);

    if (filter) {
        switch (filterType) {
            case "priceAsc":
                cursos.sort((a, b) => parseFloat(a.price.replace(/\D/g, '')) - parseFloat(b.price.replace(/\D/g, '')));
                break;
            case "priceDesc":
                cursos.sort((a, b) => parseFloat(b.price.replace(/\D/g, '')) - parseFloat(a.price.replace(/\D/g, '')));
                break;
            case "dateDesc":
                cursos.sort((a, b) => new Date(b.startDate.split('\n')[1].trim()) - new Date(a.startDate.split('\n')[1].trim()));
                break;
        }
    }
    return { courses: cursos, totalPages: Math.ceil(totalCursos / limit), totalCourses: totalCursos };
};

exports.searchCoursesService = async (query) => {
    return await Course.find({
        title: { $regex: new RegExp(query, 'i') }
    });
};
