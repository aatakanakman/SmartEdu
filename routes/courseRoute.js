const   express               = require('express'),

        courseController      = require('../controllers/courseController'),
        roleMiddleware        = require('../middlewares/roleMiddleware')



const router = express.Router();

router.route('/').post(roleMiddleware(['teacher','admin']), courseController.createCourse); //! /courses demek
router.route('/').get(courseController.getAllCourses);
router.route('/:slug').get(courseController.getCourse);
router.route('/enroll').post(courseController.enrollCourse);
router.route('/release').post(courseController.releaseCourse);
router.route('/:slug').delete(courseController.deleteCourse); 
router.route('/:slug').put(courseController.updateCourse); 



module.exports = router;