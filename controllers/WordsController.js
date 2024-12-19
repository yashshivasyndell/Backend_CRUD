const Words = require('../models/words');

const createWord = async (req, res) => {
    try {
        const { language, level, category, word, sentence } = req.body;
        const existingWord = await Words.findOne({ word });
        if (existingWord) {
            return res.status(400).json({ message: 'Word already exists' });
        }
        const newWord = new Words({ language, level, category, word, sentence });
        await newWord.save();
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
    console.log("api congole");
    try {
        const { word, homonym } = req.body;
        console.log("this is req body",req.body);
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
        const updatedWord = await Words.findOneAndUpdate(
            { word },
            { homonym }, 
            { new: true }
        );

        if (!updatedWord) {
            return res.status(404).json({ message: 'Word not found' });
        }

        if (!updatedWord.zoundslike.includes(homonym)) {
            return res.status(404).json({ message: 'Homonym not found in the word' });
        }

        res.status(200).json({
            message: 'Homonym deleted successfully',
            word: updatedWord,
        });
    } catch (error) {
        console.error('Error deleting homonym:', error);
        res.status(500).json({ message: 'Server error occurred' });
    }
};


module.exports = {createWord,deleteWord,addWordWithHomonym,deleteHomonym}

