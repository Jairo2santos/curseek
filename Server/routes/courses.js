const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/courses.controller.js');



router.get('/', coursesController.getAllCourses);
router.get('/search', coursesController.searchCourses);

router.put('/:id/title', coursesController.updateCourseTitle);
// Dentro de courses.jss

router.get('/:id', coursesController.getSingleCourse);



module.exports = router;
