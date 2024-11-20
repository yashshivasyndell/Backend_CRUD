const e = require("express");
const Productmodel = require("../models/productmodel");
const { json } = require("body-parser");

// creating product
const createProduct = async (req,res)=>{
    try{
        const result = await Productmodel.create(req.body);
        res.status(200).json(result);
    }catch(e){
        console.log("error");
    }
}

//read product
const returnProd = async (req,res)=>{
    try{
      const result = await Productmodel.find();
      res.status(200).json(result);
    }catch(err){
      res.status(500).json(err);
    }
}

//update
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
module.exports = {createProduct,returnProd,updateProd,deleteprod};