const {signup,login, loadUser,clearcookies, resetPassword, userLogin} = require('../controllers/AuthControllers');
const sender = require('../controllers/Mailsender');
const isAuthenticated = require('../middlewares/authMiddleware');
const {signupValidation,loginValidation} = require('../middlewares/AuthValidation');

const router = require('express').Router();

router.post('/adminlogin',loginValidation,login);

router.post('/login',loginValidation,userLogin);

router.post("/signup",signupValidation,signup)

router.get("/loadUser", isAuthenticated,loadUser)

router.post("/cookies",clearcookies)

router.post("/resetPassword",isAuthenticated,resetPassword)

router.post("/sender",sender)


module.exports = router;