const express = require('express');
const router = express.Router();
const Course = require('../models/course.models.js');

router.get('/', async (req, res) => {
    const categoria = req.query.categories;
    const filterType = req.query.filter;
    const page = Number(req.query.page) || 1; 
    const limit = 6; 
    const skip = (page - 1) * limit;

    let query = {};

    if (categoria) {
        query.category = categoria;
    }

    try {
        const totalCursos = await Course.countDocuments(query);
        let cursos = await Course.find(query).skip(skip).limit(limit);

        // Si hay un filtro aplicado, clasificar los cursos de acuerdo al filtro
      if (filterType) {
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

        const totalPages = Math.ceil(totalCursos / limit);
        res.json({ courses: cursos, totalPages: totalPages, totalCourses: totalCursos });
    } catch (error) {
        console.error("Error al obtener los cursos:", error);
        res.status(500).send("Error interno del servidor");
    }
});

module.exports = router;
