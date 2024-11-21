const express = require("express")
const mongoose = require("mongoose")
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const db = process.env.mongo;
const route = require("./routes/prodRoutes");
const cors = require('cors')

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"], 
  }));

//route

app.use(express.json());

//posting route
app.use("/product",route);

app.get("/",(req,res)=>{
    res.send("welcome")
})

app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`);
})

//db connection

mongoose.connect(db).then(()=>{
    console.log("db connected");
}).catch((e)=>{
    console.log("error");
})