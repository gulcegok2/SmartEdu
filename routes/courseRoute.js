const express = require('express');
const router = express.Router();

const courseController = require('../controllers/courseController');

router.route('/').post(courseController.createCourse); //localhost:3000/courses
// oradaki " / " courses sayfasına gideceğimizi sonrasında bir şey olmadığını gösteriyor. Örnek:
//router.route('/yeni').post(courseController.yeniKurs); //localhost:3000/courses/yeni

router.route('/').get(courseController.getAllCourses); //localhost:3000/courses
router.route('/:slug').get(courseController.getCourse); //localhost:3000/courses/123

module.exports = router;
