
const UTNCourse = require('../models/utn.models.js');


exports.getUTNCategories = async (req, res) => {
    try {
        const categorias = await UTNCourse.distinct("category");
        res.json(categorias);
    } catch (error) {
        console.error("Error al obtener las categorías de UTN:", error);
        res.status(500).send("Error interno del servidor");
    }
};
