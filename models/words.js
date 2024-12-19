const mongoose = require('mongoose')
const words = mongoose.Schema({
     
    language:{
        type:String,
        require:true,
    },
    level:{
        type:String,
        require:false
    },
    category:{
        type:String,
        require:false
    },
    word: {
        type: String,
        required: true,
        unique: true,
    },
    sentence: {
        type: String,
        required: false,
    },
    homonym: {
        type: String,
        required: false,
        
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }

})

const Words = mongoose.model("Words",words)
module.exports = Words

