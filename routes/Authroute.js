const {signup,login, loadUser,clearcookies} = require('../controllers/AuthControllers');
const isAuthenticated = require('../middlewares/authMiddleware');
const {signupValidation,loginValidation} = require('../middlewares/AuthValidation');

const router = require('express').Router();

router.post('/login',loginValidation,login);

router.post("/signup",signupValidation,signup)

router.get("/loadUser", isAuthenticated,loadUser)

router.post("/cookies",clearcookies)


module.exports = router;