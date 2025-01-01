const chat = require("../models/ChatSchema");
const User = require("../models/productmodel");

const saveChat = async (req, res) => {
  try {
    const { sender, receiver, message, timestamp, messageType, read } =
      req.body;
    let senderUser = req.id;

    const receiverUser = await User.findById(receiver);
    if (!senderUser || !receiverUser) {
      return res.status(404).json({ message: "sender or receiver not found" });
    }
    const newMessage = new chat({
      sender: senderUser,
      receiver,
      message,
      timestamp: new Date(),
      messageType,
      read,
    });
    const saveMessage = await newMessage.save();

    req.io.emit("messageSent", {
      message: saveMessage.message,
      sender: saveMessage.sender,
      receiver: saveMessage.receiver,
      timestamp: saveMessage.timestamp,
      messageType: saveMessage.messageType,
      read: saveMessage.read, 
    });
    console.log(`message sent to ${receiver} by this id ${sender}`);

    return res
      .status(200)
      .json({ message: "message saved successfully", chat: saveMessage });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error in saving message", cause: error.message });
  }
};

//message status
const markseen = async (req, res) => {
  try {
    const { messageId } = req.body;
    if (!messageId) {
      res.status(404).json({ message: "message Id not found" });
    }
    const markMessage = await chat.findByIdAndUpdate(
      messageId,
      { read: true },
      { new: true }
    );
    res.status(200).json({ message: "message marked seen" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in marking message seen", cause: error.message });
  }
};

module.exports = { saveChat, markseen };
