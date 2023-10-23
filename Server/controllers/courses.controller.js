const Course = require('../models/course.models.js');



exports.updateCourseTitle = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    try {
        await Course.findByIdAndUpdate(id, { title });
        res.status(200).json({ message: "Título actualizado con éxito." });
    } catch (error) {
        console.error("Error al actualizar el título:", error);
        res.status(500).send("Error interno del servidor");
    }
};

exports.getSingleCourse = async (req, res) => {
  const { id } = req.params;
  
  try {
    const course = await Course.findById(id);
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
    const skip = (page - 1) * limit;

    let query = {};

    if (categoria) {
        query.category = categoria;
    }

    try {
        const totalCursos = await Course.countDocuments(query);
        let cursos = await Course.find(query).skip(skip).limit(limit);

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
};
// En controllers/courses.controller.js

exports.searchCourses = async (req, res) => {
    const query = req.query.q;

    try {
        const courses = await Course.find({
            title: { $regex: new RegExp(query, 'i') }
        });

        res.status(200).json(courses);
    } catch (error) {
        console.error("Error al buscar cursos:", error);
        console.error("Detalles del error:", error.message, error.stack);
        res.status(500).send("Error interno del servidor");
    }
};