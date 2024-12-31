const chat = require('../models/ChatSchema')

const saveChat = async (req,res)=>{
    try{const {sender,receiver,message,timestamp,messageType,read} = req.body;
    const newMessage = new chat({sender,receiver,message,timestamp,messageType,read})
    const saveMessage = await newMessage.save();
    return res.status(200).json({message:'message saved successfully'})
}catch(error){
    res.status(500).json({message:'error in saving message'})
}
}

module.exports = saveChat;