const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');

router.route('/').post(categoryController.createCategory); 
router.route('/:id').delete(categoryController.deleteCategory);


module.exports = router;