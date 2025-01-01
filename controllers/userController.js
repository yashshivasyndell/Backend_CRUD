const { json } = require('body-parser');
const allUser = require('../models/allUser');
const User = require('../models/productmodel')

const getData = async (req,res)=>{
    try{
        const users = await allUser.find().select("email phoneNumber username dateofbirth gender education country role created picture verification isGuest gameTimer");
        return res.status(200).json({
            success:true,
            data:users
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:'server error!'
        })
    }
}

const getUsers = async (req,res)=>{
    try{
        const allUsers = await User.find().select("id name")
    
        res.status(200).json({
            allUsers,
            success:true
        })
    }catch(error){
        res.status(500).json({
            message:'error in fetching user',
            cause:error.message
        })
    }

}

module.exports = {getData,getUsers}
