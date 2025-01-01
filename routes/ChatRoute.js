const express = require('express')
const {saveChat} = require('../controllers/ChatController')
const isAuthenticated = require('../middlewares/authMiddleware')
const router = express.Router()

router.post('/sendmessage',isAuthenticated,saveChat)


module.exports = router 