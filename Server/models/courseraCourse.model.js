const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
});

const courseraCourseSchema = new mongoose.Schema({
  rating: String,
  level: String,
  estimatedTime: String,
  schedule: String,
  scheduleExplanation: String,
  title: String,
  shortDescription: String,
  mainCategory: String,
  secondaryCategory: String,
  longDescription: String,
  courseDetailsText: String,
  instructors: [instructorSchema],
  courseUrl: String,
  imgUrl: String,
  university: String, 
  slug: { type: String, unique: true, required: true } 

});
courseraCourseSchema.pre('save', function(next) {
    if (this.isModified('title') || this.isNew) {
      this.slug = normalizeText(this.title);
    }
    next();
  });
const CourseraCourse = mongoose.model('CourseraCourse', courseraCourseSchema,'cursos_COURSERA_Uni' );

module.exports = CourseraCourse;
