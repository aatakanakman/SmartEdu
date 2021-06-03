const   express                = require('express'),

        authController         = require('../controllers/authController'),
        authMiddleware         = require('../middlewares/authMiddleware')


const router = express.Router();

router.route('/signup').post(authController.createUser); //users/signup
router.route('/login').post(authController.loginUser); //users/signup
router.route('/logout').get(authController.logoutUser); //users/signup
router.route('/dashboard').get(authMiddleware, authController.getDashboardPage); //users/signup





module.exports = router;