//edx.models.js
const mongoose = require('mongoose');
const { Schema } = mongoose;


const instructorSchema = new Schema({
    name: String,
    bio: String,
    image_url: String,
  });
  
  const courseSchema = new Schema({
    course_id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: String,
    start_date: Date,
    end_date: Date,
    enrollment_start: Date,
    enrollment_end: Date,
    pacing_type: String,
    effort: String,
    price: { amount: Number, currency: String },
    instructors: [instructorSchema],
    course_image: String,
    language: String,
    categories: [String],
    certification: { available: Boolean, verification_deadline: Date },
    grades: { passing_grade: String, grading_policy: String },
    content: [{ type: { type: String }, title: String, url: String }],
    number: String, // Nuevo campo para el número del curso
    org: String, // Nuevo campo para la organización del curso
    mobile_available: Boolean, // Nuevo campo para disponibilidad móvil
  }, { timestamps: true, collection: 'cursos_EDX' });
  
  const Course = mongoose.model('Course', courseSchema, 'cursos_EDX');
  
  module.exports = Course;