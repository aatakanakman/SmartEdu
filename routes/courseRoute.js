const   express               = require('express'),

        courseController      = require('../controllers/courseController'),
        roleMiddleware        = require('../middlewares/roleMiddleware')



const router = express.Router();

router.route('/').post(roleMiddleware(['teacher','admin']), courseController.createCourse); //! /courses demek
router.route('/').get(courseController.getAllCourses);
router.route('/:slug').get(courseController.getCourse);


module.exports = router;