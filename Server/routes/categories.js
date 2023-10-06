const express = require('express');
const router = express.Router();
const Course = require('../models/course.models.js');

router.get('/', async (req, res) => {
    try {
      const categorias = await Course.distinct("category");
      res.json(categorias);
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
      res.status(500).send("Error interno del servidor");
    }
  });

module.exports = router;


