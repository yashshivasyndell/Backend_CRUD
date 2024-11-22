const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const db = process.env.mongo;
const route = require("./routes/prodRoutes");
const cors = require('cors');


app.use(cors({
    origin: "http://localhost:5174",  
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"], 
}));


app.use(express.json());

// Routes
app.use("/product", route);

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
