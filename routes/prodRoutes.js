const express = require("express");
const {createUser, updateProd,deleteprod} = require("../controllers/prodController")
const route = express.Router();

//create
route.post("/register",createUser);

//Update
route.put("/update/:id",updateProd)

//Delete
route.delete("/delete/:id",deleteprod)
module.exports = route;

