const Words = require('../models/words');
const Notification = require('../models/notification');
const { Socket } = require('socket.io');

const createWord = async (req, res) => {
    try {
        const { language, level, category, word, sentence } = req.body;
        const existingWord = await Words.findOne({ word });
        if (existingWord) {
            return res.status(400).json({ message: 'Word already exists' });
        }
        const newWord = new Words({ language, level, category, word, sentence });
        const wordSuccess = await newWord.save();
        if(wordSuccess){
            const newNotif = new Notification({
                userId:newWord._id,
                message:`${word}`,
                createdAt:new Date()
            })
            await newNotif.save()

           
            
            // Emit a 'newWord' event to all connected clients
            req.io.emit('newWord', {
                message: 'A new word has been added successfully!',
                word: wordSuccess,
                notification: newNotif,
            })
            console.log('Event emitted to all clients');

            return res.status(201).json({
                message: 'Word created successfully',
                word: wordSuccess,
                notification: newNotif,
            });

        }else{
            res.status(500).json({message:'error in server'})
        }

        res.status(201).json(newWord);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error is there' });
    }
};

// Delete Word
const deleteWord = async (req, res) => {
    try {
        const {language, word } = req.body; 
        const deletedWord = await Words.findOneAndDelete({ language,word });
          console.log(req.body);
        if (!deletedWord) {
            return res.status(404).json({ message: 'Word not found' });
        }

        res.status(200).json({ message: 'Word deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error is there' });
    }
};

// Homonym
const addWordWithHomonym = async (req, res) => {
    console.log("api console");
    try {
        const { word, homonym } = req.body;
        
        // Validate required fields
        if (!word || !homonym) {
            return res.status(400).json({ message: 'Both word and homonym are required' });
        }

        // Check if the word already exists
        const existingWord = await Words.findOne({ word });
        if (existingWord) {
            return res.status(400).json({ message: 'Word already exists' });
        }

        // Check if the homonym already exists as a separate word
        const existingHomonym = await Words.findOne({ word: homonym });
        if (existingHomonym) {
            return res.status(400).json({ message: 'Homonym already exists as a word' });
        }

        // Create and save the word
        const newWord = new Words({
            language: "Default Language",
            level: "Default Level",       
            category: "Default Category", 
            word,
            sentence: "Default sentence for the word", 
            homonym,
        });
        await newWord.save();
        console.log(newWord);

        res.status(201).json({ message: 'Word and homonym added successfully', word: newWord });
    } catch (error) {
        console.error('Error adding word and homonym:', error);
        res.status(500).json({ message: 'Server error occurred' });
    }
};

//Delete homonym
const deleteHomonym = async (req, res) => {
    try {
        const { word, homonym } = req.body;

        // Validate required fields
        if (!word || !homonym) {
            return res.status(400).json({ message: 'Both word and homonym are required' });
        }

        // Find the word and update its zoundslike array
        const deletedword = await Words.findOneAndDelete(
            {
                word,
                homonym
            } 
        );

        if (!deletedword) {
            return res.status(404).json({ message: 'Word not found deleted already' });
        }
       

        res.status(200).json({
            message: 'Homonym deleted successfully',
            word: deletedword,
        });
    } catch (error) {
        console.error('Error deleting homonym:', error);
        res.status(500).json({ message: 'Server error occurred' });
    }
};

//Notification
const getNotifications  = async(req,res)=>{
   try{
    const notification = await Notification.find()
    res.status(200).json(notification)
}catch(error){
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Server error occurred'});
}
}

//Notifiacation status
const isNotificationSeen = async (req,res)=>{
    try{
    const noOfnotification = await Notification.countDocuments({seen:false})
    return res.status(200).json({noOfnotification})}
    catch(error){
        console.log("error in getting no of notification");
        res.json({error})
    }
}

//Notification status marking
const markNotification = async (req,res)=>{
    try{
      const markedSeen = await Notification.updateMany({seen:true})
      res.status(200).json({message:"all notifications marked seen"})
    }catch(error){
    res.status(500).json({message:"Error in marking!"})
    }
}

module.exports = {createWord,deleteWord,addWordWithHomonym,
    deleteHomonym,getNotifications,
    isNotificationSeen,markNotification}

