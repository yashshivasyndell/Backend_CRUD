const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const db = process.env.mongo;
const route = require("./routes/prodRoutes");
const cors = require('cors');
const Authroute = require('./routes/Authroute')
const jwtAuth = require('./routes/jwtAuth')

app.use(cors({
    origin: "http://localhost:5173",  
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"], 
}));


app.use(express.json());

// Routes
app.use("/product", route);

app.use('/auth',Authroute)
//Jwt authorization 
app.use("/products",jwtAuth)
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
