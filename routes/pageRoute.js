
const   express = require('express'),
        pageController = require('../controllers/pageController'),
        redirectMiddleware = require('../middlewares/redirectMiddleware')



const router = express.Router();

router.route('/').get(pageController.getIndexPage);
router.route('/about').get(pageController.getAboutPage);
router.route('/register').get(redirectMiddleware, pageController.getRegisterPage);
router.route('/login').get(redirectMiddleware, pageController.getLoginPage);





module.exports = router;