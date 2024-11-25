const {signup,login} = require('../controllers/AuthControllers');
const {signupValidation,loginValidation} = require('../middlewares/AuthValidation');

const router = require('express').Router();

router.post('/login',loginValidation,login);

router.post("/signup",signupValidation,signup)



module.exports = router;