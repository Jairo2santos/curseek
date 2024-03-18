const mongoose = require('mongoose');
const UdemyCourse = require('../models/providers/udemy.models');
const UtnCourse = require('../models/providers/utn.models');
const UnifiedCourse = require('../models/generals/unifiedCourse.model');
const CourseraCourse = require('../models/providers/courseraCourse.model');


mongoose.connect('mongodb://localhost:27017/cursosApp');

const combineCourses = async () => {
  const udemyCourses = await UdemyCourse.find({});
  const utnCourses = await UtnCourse.find({});

  // Función para tratar de insertar o actualizar cursos unificados
  const tryInsertOrUpdate = async (unifiedCourseData) => {
    const existingCourse = await UnifiedCourse.findOne({ slug: unifiedCourseData.slug });
    if (existingCourse) {
      console.log(`El slug ya existe, omitiendo o actualizando: ${unifiedCourseData.slug}`);
      // Opción 1: Omitir la inserción si el curso ya existe
      // Opción 2: Actualizar el curso existente con nueva información
      // await UnifiedCourse.updateOne({ _id: existingCourse._id }, unifiedCourseData);
    } else {
      const unifiedCourse = new UnifiedCourse(unifiedCourseData);
      await unifiedCourse.save();
    }
  };

  // Combinar los cursos de Udemy
  for (const course of udemyCourses) {
    const imageUrl = course.image_240x135 || course.image_480x270;
    await tryInsertOrUpdate({
      title: course.title,
      description: course.headline,
      price: course.is_paid ? course.price : 'Gratis',
      originalId: course._id.toString(),
      image: imageUrl,
      link: course.url,
      source: 'UDEMY',
      slug: course.slug,
    });
  }

  // Combinar los cursos de UTN
  for (const course of utnCourses) {
    await tryInsertOrUpdate({
      title: course.title,
      description: course.summary || 'Este curso de la UTN no tiene descripción disponible.',
      price: course.price,
      originalId: course._id.toString(),
      image: course.imgUrl,
      link: course.link,
      source: 'UTN',
      slug: course.slug,
    });
  }

  const courseraCourses = await CourseraCourse.find({});
for (const course of courseraCourses) {
  // Extrayendo la información relevante de cada curso
  const instructorsNames = course.instructors.map(instructor => instructor.name).join(", ");
  await tryInsertOrUpdate({
    title: course.title,
    description: `${course.shortDescription}. Instructor(es): ${instructorsNames}.`,
    price: 'Pago mensual', 
    originalId: course._id.toString(),
    image: course.imgUrl,
    link: course.courseUrl,
    source: 'COURSERA',
    slug: course.slug,
  });
}
  console.log('Todos los cursos han sido combinados en la colección cursos_ALL');
};

combineCourses().then(() => {
  console.log('Combinación completada');
  mongoose.disconnect();
});
