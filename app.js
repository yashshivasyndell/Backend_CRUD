const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const db = process.env.mongo;
const cors = require('cors');
const cookieParser = require('cookie-parser')
const Authroute = require('./routes/Authroute')
const dataRoute = require('./routes/dataRoute')

app.use(cors({
    origin: "http://localhost:5173",  
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"], 
    credentials: true,
}));


app.use(cookieParser());
app.use(express.json());

// Routes


app.use('/auth',Authroute)
app.use('/users',dataRoute)
//Jwt authorization 

// Test route
app.get("/", (req, res) => {
    res.send("Welcome");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});

// MongoDB connection
mongoose.connect(db).then(() => {
    console.log("DB connected");
}).catch((e) => {
    console.error("DB connection error:", e);
});
