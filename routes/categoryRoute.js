const   express                = require('express'),
        categoryController     = require('../controllers/categoryController');

const router = express.Router();

router.route('/').post(categoryController.createCategory); //! /categories demek
router.route('/:id').delete(categoryController.deleteCategory); //categoris/:id


module.exports = router;