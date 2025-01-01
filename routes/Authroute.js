const {signup,login, loadUser,clearcookies, resetPassword} = require('../controllers/AuthControllers');
const { saveChat } = require('../controllers/ChatController');
const sender = require('../controllers/Mailsender');
const isAuthenticated = require('../middlewares/authMiddleware');
const {signupValidation,loginValidation} = require('../middlewares/AuthValidation');

const router = require('express').Router();

router.post('/adminlogin',loginValidation,login);

router.post('/login',loginValidation);

router.post("/signup",signupValidation,signup)

router.get("/loadUser", isAuthenticated,loadUser)

router.post("/cookies",clearcookies)

router.post("/resetPassword",isAuthenticated,resetPassword)



module.exports = router;