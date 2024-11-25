const User = require("../models/productmodel");
const bcrypt = require('bcrypt')
require('dotenv').config()
const jwt = require('jsonwebtoken')
//sign up
const signup = async (req,res)=>{
try{
    const {name,lastname,email,phone,dob,gender,password,country,state,pincode} = req.body;
    const user = await User.findOne({email});
    if(user){
        return res.status(409).json({message:"Email exists You can login",success:false})
    }
    const newUsermodel = new User({name,lastname,email,phone,dob,gender,password,country,state,pincode})
    newUsermodel.password = await bcrypt.hash(password,10)
    await newUsermodel.save();
    res.status(201).json({message:"Signup successfully",success:true})
}catch(error){
    res.status(500).json({message:"Internal server error is there",error:error,success:false})
}
}

//Login
const login = async (req,res)=>{
try{
    const {name,lastname,email,phone,dob,gender,password,country,state,pincode} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(403).json({message:"Authentication failed Wrong Email!",success:false})
    }
    const isPassEqual = await bcrypt.compare(password,user.password)
    if(!isPassEqual){
        return res.status(403).json({message:"password not matched",success:false})
    }
    const jwtToken = jwt.sign({email:user.email,_id:user._id},process.env.jwt_secret,{expiresIn:'24h'})
    
    res.status(200).json({message:"Logged In successfully",success:true,jwtToken,email,name:user.name})
}catch(error){
    res.status(500).json({message:"Internal server error is there",error:error,success:false})
}
}

module.exports = {signup,login}