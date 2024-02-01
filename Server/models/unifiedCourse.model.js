// models/unifiedCourse.model.js
const mongoose = require('mongoose');
const normalizeText = require('../middlewares/normalize.middleware'); 



const UnifiedCourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, 
  },
  description: {
    type: String,
    required: false, 
  },
  price: {
    type: String,
    required: false, 
  },
  originalId: {
    type: String,
    required: true, 
  },
  image: {
    type: String,
    required: [false, 'Una imagen no es necesaria para todos los cursos.']
  },
  link: {
    type: String,
    required: true, 
  },
  source: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true
  }
});

UnifiedCourseSchema.pre('save', function(next) {
  if (this.isModified('title') || this.isNew) {
    this.slug = normalizeText(this.title);
  }
  next();
});

UnifiedCourseSchema.index({ title: 'text', description: 'text', slug: 'text' });

const UnifiedCourse = mongoose.model('UnifiedCourse', UnifiedCourseSchema, 'cursos_ALL');

module.exports = UnifiedCourse;