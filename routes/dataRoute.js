const express = require('express')
const router = express.Router()
const {getData,getUsers} = require('../controllers/userController')

router.get('/dataset',getData)
router.get('/getusers',getUsers)

module.exports = router