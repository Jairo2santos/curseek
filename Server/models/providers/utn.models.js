const mongoose = require('mongoose');
const normalizeText = require('../../middlewares/normalize.middleware'); 

const CourseSchema = new mongoose.Schema({
  title: String,
  startDate: String,
  duration: String,
  price: String,
  modalities: [String],
  teachers: String,
  summary: String,
  link: String,
  imgUrl: String,
  category: String,
  slug: {
    type: String,
    unique: true
  }
});



CourseSchema.pre('save', function(next) {
  if (this.isModified('title') || this.isNew) {
    this.slug = normalizeText(this.title);
  }
  next();
});

const UTNCourse = mongoose.model('course', CourseSchema, 'cursos_UTN');

module.exports = UTNCourse;
