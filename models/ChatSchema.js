const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now, 
    },
    messageType: {
        type: String,
        enum: ['text', 'image', 'file'], 
        default: 'text',
    },
    read: {
        type: Boolean,
        default: false, 
    },
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
