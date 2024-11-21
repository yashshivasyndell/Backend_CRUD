const e = require("express");
const Productmodel = require("../models/productmodel");
const { json } = require("body-parser");
const User = require('../models/productmodel')

// creating product
const createProduct = async (req,res)=>{
    try{
        const result = await Productmodel.create(req.body);
        res.status(200).json(result);
    }catch(e){
        console.log("error");
    }
}

//add from data
const createUser = async (req, res) => {
    const { name, lastname, email, phone, dob, gender, password, country, state, pincode } = req.body;
  
    try {
    
      if (!name || !lastname || !email || !phone || !dob || !gender || !password || !country || !state || !pincode) {
        return res.status(400).json({ message: "Please provide all required fields." });
      }
  
     
      const newUser = new User({
        name,
        lastname,
        email,
        phone,
        dob,
        gender,
        password, 
        country,
        state,
        pincode,
      });
  
      
      const savedUser = await newUser.save();
  
      
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(500).json({ message: "Error saving user to database", error: err.message });
    }
  };


const updateProd = async (req,res)=>{
    try{
        const id = req.params.id;
        const productExists = await Productmodel.findOne({_id:id});

        if(!productExists){
            return res.status(404).json({message:"product dosnt exist"})
        }

        const result = await Productmodel.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json(result);
    }catch(e){
        res.status(500).json(e);
    }
}
//Delete
const deleteprod = async (req,res)=>{
    try{
        const id = req.params.id;
        const productExists = await Productmodel.findOne({_id:id});

        if(!productExists){
            return res.status(404).json({message:"product dosnt exist"})
        }
    const result = await Productmodel.findByIdAndDelete(id);
    res.status(200).json({message:"Product successfully deleted!"})
    }catch(err){
        res.status(500).json(err);
    }
}
module.exports = {createUser,createProduct,updateProd,deleteprod};