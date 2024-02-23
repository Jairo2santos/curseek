const { getAllCourseraCourses, getCourseraCoursesByCategory, getCourseraCoursesByUniversity, getSingleCourseraCourseBySlug } = require('../../services/providers/coursera.services');
const CourseraCourse = require('../../models/providers/courseraCourse.model');


exports.getCourseraCourses = async (req, res) => {
    const { page = 1, limit = 10, category } = req.query;
    try {
        const options = {
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
            category
        };

        let result;
        if (options.category) {
            result = await getCourseraCoursesByCategory(options.category, options.page, options.limit);
        } else {
            result = await getAllCourseraCourses(options.page, options.limit);
        }

        // Aquí, asegúrate de que el resultado tenga la estructura esperada
        if (!result.courses || result.courses.length === 0) {
            // Manejar caso sin cursos
            return res.status(404).json({ message: "No se encontraron cursos." });
        }

        res.status(200).json({
            courses: result.courses,
            totalPages: result.totalPages || 1,
            totalCourses: result.totalCourses || result.courses.length,
            currentPage: options.page
        });
    } catch (error) {
        console.error("Error al obtener cursos de Coursera:", error);
        res.status(500).send("Error interno del servidor");
    }
};


exports.getCourseraCoursesByUni = async (req, res) => {
  const { university } = req.params;
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;

  try {
    const courses = await CourseraCourse.find({ university })
                                         .populate('instructors') 
                                         .skip((page - 1) * limit)
                                         .limit(limit);
    const totalCourses = await CourseraCourse.countDocuments({ university });

    res.status(200).json({
      courses: courses,
      totalPages: Math.ceil(totalCourses / limit),
      totalCourses: totalCourses,
      currentPage: page
    });
  } catch (error) {
    console.error(`Error al obtener cursos de la universidad ${university}:`, error);
    res.status(500).send("Error interno del servidor");
  }
};

exports.getSingleCourseraCourse = async (req, res) => {
  const { slug } = req.params;
  try {
    const course = await getSingleCourseraCourseBySlug(slug);
    if (!course) {
      return res.status(404).json({ message: "Curso no encontrado" });
    }
    res.json(course);
  } catch (error) {
    console.error("Error al obtener el curso por slug:", error);
    res.status(500).send("Error interno del servidor");
  }
};

exports.getCourseraProfessorsByUni = async (req, res) => {
  const { university } = req.params;

  try {
    const courses = await CourseraCourse.find({ university }).populate('instructors');
    let professors = [];

    courses.forEach(course => {
      if (course.instructors && course.instructors.length) {
        // Agregar profesores a la lista, evitando duplicados
        course.instructors.forEach(instructor => {
          if (!professors.some(prof => prof._id.equals(instructor._id))) {
            professors.push(instructor);
          }
        });
      }
    });

    res.status(200).json(professors);
  } catch (error) {
    console.error(`Error al obtener profesores de la universidad ${university}:`, error);
    res.status(500).send("Error interno del servidor");
  }
};