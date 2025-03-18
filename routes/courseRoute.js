const express = require('express');
const router = express.Router();
const roleMiddleware = require('../middlewares/roleMiddleware');

const courseController = require('../controllers/courseController');

router
  .route('/')
  .post(roleMiddleware(['instructor', 'admin']), courseController.createCourse); //localhost:3000/courses
router.route('/').get(courseController.getAllCourses); //localhost:3000/courses
router.route('/:slug').get(courseController.getCourse); //localhost:3000/courses/123
router.route('/:slug').delete(courseController.deleteCourse); //localhost:3000/courses/123
router.route('/:slug').put(courseController.updateCourse); //localhost:3000/courses/123
router.route('/enroll').post(courseController.enrollCourse); //localhost:3000/courses/enroll
router.route('/release').post(courseController.releaseCourse); //localhost:3000/courses/release

module.exports = router;
