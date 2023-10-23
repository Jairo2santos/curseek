const Course = require('../models/course.models.js');

exports.getCategories = async (req, res) => {
    try {
        const categorias = await Course.distinct("category");
        res.json(categorias);
    } catch (error) {
        console.error("Error al obtener las categorías:", error);
        res.status(500).send("Error interno del servidor");
    }
};