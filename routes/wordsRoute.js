const express = require('express')
const router = express.Router()
const {createWord,deleteWord,addWordWithHomonym,deleteHomonym} = require('../controllers/WordsController')


router.post('/addwords',createWord)
router.post('/deleteWord',deleteWord)
router.post('/addhomonym',addWordWithHomonym)
router.post('/deletehomonym',deleteHomonym)

module.exports = router