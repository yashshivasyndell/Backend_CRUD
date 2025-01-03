const mongoose = require('mongoose')
const db = process.env.mongo
require('dotenv').config()

const Database = () => {
    mongoose.connect(db).then(() => {
    console.log("DB connected ");
}).catch((e) => {
    console.error("DB connection error:", e);
});
}

module.exports = Database