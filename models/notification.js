const mongoose = require('mongoose')

const notificationSchema =new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    message:String,
    createdAt:{type:Date,default:Date.now}
})

const Notification = mongoose.model('Notification',notificationSchema)

module.exports = Notification;