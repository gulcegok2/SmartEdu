const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const { body } = require('express-validator');
const User = require('../models/User');

router.route('/signup').post(
  [
    body('name').not().isEmpty().withMessage('Please Enter Your Name'),

    body('email')
      .isEmail()
      .withMessage('Please Enter Valid Email')
      .custom((userEmail) => {
        return User.findOne({ email: userEmail }).then((user) => {
          if (user) {
            return Promise.reject('Email already exists!');
          }
        });
      }),

    body('password').not().isEmpty().withMessage('Please Enter A Password'),
  ],
  authController.createUser
);
router.route('/signup').post(authController.createUser); //http://localhost:3000/users/signup
router.route('/login').post(authController.loginUser); //http://localhost:3000/users/login
router.route('/logout').get(authController.logoutUser); //http://localhost:3000/users/logout
router.route('/dashboard').get(authMiddleware, authController.getDashboardPage); //http://localhost:3000/users/dashboard
router.route('/:id').delete(authMiddleware, authController.deleteUser); //http://localhost:3000/users/123

module.exports = router;
