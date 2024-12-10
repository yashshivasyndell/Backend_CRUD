const express = require('express')
const router = express.Router()
const getData = require('../controllers/userController')

router.get('/dataset',getData)

module.exports = router