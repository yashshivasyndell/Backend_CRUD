const express = require("express");
const {createProduct,returnProd, updateProd,deleteprod} = require("../controllers/prodController")
const route = express.Router();

//create
route.post("/create",createProduct);

//read
route.get("/read",returnProd);

//Update
route.put("/update/:id",updateProd)

//Delete
route.delete("/delete/:id",deleteprod)
module.exports = route;

