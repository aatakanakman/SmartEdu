const   express                     = require('express'),
        { body }  = require('express-validator'),
        authController              = require('../controllers/authController'),
        authMiddleware              = require('../middlewares/authMiddleware'),
        User                        = require('../models/User')


const router = express.Router();

router.route('/signup').post([

    body('name').not().isEmpty().withMessage('Please enter your name--'),


    body('email').isEmail().withMessage('--Please enter valid email--').custom((userEmail)=>{
        return User.findOne({email : userEmail}).then(user=>{
            if (user) {
                return Promise.reject('Email is already exits!')
            }
        })
    }),



    body('password').not().isEmpty().withMessage('--Please enter password'),

],authController.createUser); //users/signup
router.route('/login').post(authController.loginUser); //users/signup
router.route('/logout').get(authController.logoutUser); //users/signup
router.route('/dashboard').get(authMiddleware, authController.getDashboardPage); //users/signup





module.exports = router;