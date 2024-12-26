const express = require('express')
const router = express.Router()
const {createWord,deleteWord,addWordWithHomonym,deleteHomonym,getNotifications} = require('../controllers/WordsController')
const isAuthenticated = require('../middlewares/authMiddleware')


router.post('/addwords',createWord)
router.post('/deleteWord',deleteWord)
router.post('/addhomonym',addWordWithHomonym)
router.post('/deletehomonym',deleteHomonym)
router.get('/getnotif',isAuthenticated,getNotifications)

module.exports = router