const allUser = require('../models/allUser')

const getData = async (req,res)=>{
    try{
        const users = await allUser.find().select("email phoneNumber username dateofbirth gender education country role created picture verification isGuest");
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

module.exports = getData
