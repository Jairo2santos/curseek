// models/unifiedCourse.model.js
const mongoose = require('mongoose');

const UnifiedCourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Asegúrate de que el título siempre esté presente
  },
  description: {
    type: String,
    required: false, // La descripción también es esencial
  },
  price: {
    type: String,
    required: false, // Podrías querer asegurarte de que siempre hay un precio definido, incluso si es 'Gratis'
  },
  originalId: {
    type: String,
    required: true, // Útil para rastrear el documento original
  },
  image: {
    type: String,
    required: [false, 'Una imagen no es necesaria para todos los cursos.']
  },
  link: {
    type: String,
    required: true, // Enlace al curso
  },
  source: {
    type: String,
    required: true, // Fuente del curso ('UDEMY' o 'UTN')
  },
  // Añade cualquier otro campo que consideres relevante
});

const UnifiedCourse = mongoose.model('UnifiedCourse', UnifiedCourseSchema, 'cursos_ALL');
UnifiedCourseSchema.index({ title: 'text', summary: 'text', description: 'text' });

module.exports = UnifiedCourse;