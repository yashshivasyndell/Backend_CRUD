const express = require('express')
const router = express.Router()
const {createWord,deleteWord,addWordWithHomonym,deleteHomonym,getNotifications, isNotificationSeen, markNotification} = require('../controllers/WordsController')
const isAuthenticated = require('../middlewares/authMiddleware')


router.post('/addwords',isAuthenticated,createWord)
router.post('/deleteWord',deleteWord)
router.post('/addhomonym',addWordWithHomonym)
router.post('/deletehomonym',deleteHomonym)
router.get('/getnotif',isAuthenticated,getNotifications)
router.get('/unseen',isNotificationSeen)
router.post('/seen',markNotification)

module.exports = router