const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  profilePicture: String,
  address: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  favorites: [{
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    courseType: { type: String, enum: ['UDEMY', 'UTN', 'COURSERA'] }
  }],
  role: { 
    type: String, 
    enum: ['user', 'admin'], 
    default: 'user' 
  },
});

module.exports = mongoose.model('User', userSchema);