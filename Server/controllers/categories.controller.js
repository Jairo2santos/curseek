//categories.controller.js
const UTNCourse = require('../models/utn.models.js');
const UdemyCourse = require('../models/udemy.models.js');
const CourseraCourse = require('../models/courseraCourse.model.js');

exports.getUTNCategories = async (req, res) => {
    try {
        const categorias = await UTNCourse.distinct("category");
        res.json(categorias);
    } catch (error) {
        console.error("Error al obtener las categorías de UTN:", error);
        res.status(500).send("Error interno del servidor");
    }
};

exports.getUdemyCategories = async (req, res) => {
    try {
        const categories = await UdemyCourse.aggregate([
            { $match: { "primary_category.title": { $exists: true } } },
            { $group: { _id: "$primary_category.title" } }
        ]);
        const categoryTitles = categories.map(cat => cat._id); // Extraemos los títulos de las categorías

        if (categoryTitles.length === 0) {
            res.status(404).json({ message: "No se encontraron categorías." });
        } else {
            res.json(categoryTitles);
        }
    } catch (error) {
        console.error("Error al obtener las categorías de Udemy:", error);
        res.status(500).send(`Error interno del servidor: ${error.message}`);
    }
};

exports.getCourseraCategories = async (req, res) => {
    try {
        // Suponiendo que 'mainCategory' es el campo que contiene la categoría principal de cada curso
        const categories = await CourseraCourse.distinct("mainCategory");
        res.json(categories);
    } catch (error) {
        console.error("Error al obtener las categorías de Coursera:", error);
        res.status(500).send("Error interno del servidor");
    }
};