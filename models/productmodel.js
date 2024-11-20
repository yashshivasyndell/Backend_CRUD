const mongoose = require("mongoose")
const { type } = require("os")
const { title } = require("process")

const prodSchema = mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    quantity:{
        type:Number,
        require:true,
        min:1
    },description:{
        type:String,
        require:true,
        minlength:15
    },

})
const Productmodel = mongoose.model("product",prodSchema);

module.exports = Productmodel;