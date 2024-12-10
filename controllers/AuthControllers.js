const User = require("../models/productmodel");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { use } = require("../routes/Authroute");

//sign up
const signup = async (req, res) => {
  try {
    const {
      name,
      lastname,
      email,
      phone,
      dob,
      gender,
      password,
      ConfPassword, 
      country,
      state,
      pincode,
    } = req.body;

    // Check if the passwords match
    if (password !== ConfPassword) {
      return res.status(401).json({
        message: "Password and Confirm Password do not match",
        success: false,
      });
    }

    
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ message: "Email exists. You can login.", success: false });
    }

    const newUsermodel = new User({
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

    
    newUsermodel.password = await bcrypt.hash(password, 10);
    await newUsermodel.save();

    res.status(201).json({ message: "Signup successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error is there",
      error: error.message,
      success: false,
    });
  }
};

//Login api
const login = async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({
        message: "Authentication failed Wrong Email!",
        success: false,
      });
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res
        .status(403)
        .json({ message: "password not matched", success: false });
    }
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.jwt_secret,
      { expiresIn: "24h" }
    );
    const cookiePara = {
      httpOnly: true,
    };
    res.status(200).cookie("AuthToken", jwtToken , cookiePara).json({
        message: "Logged In successfully",
        success: true,
        jwtToken,
        email,
        name: user.name,
        user: user
      });
      
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error is there",
      error: error,
      success: false,
    });
  }
};
//Clear cookies
const clearcookies = (req, res) => {
  try {
    res.cookie("AuthToken",'', {
      httpOnly: true,
      path:"/"
    }).status(200).json({
      success: true,
      message: "Logged out successfully. Cookies cleared.",
    });
  } catch (error) {
    console.log("error come");
    res.status(500).json({
      message: "Error while clearing cookies",
      error: error.message,
      success: false,
    });
  }
};
//load user
const loadUser = async (req, res) => {
  try {
    const userId = req.id;
     console.log("user id is ",req.id);
    if (!userId) {
      return res.status(400).json({ message: 'User ID is missing' });
    }
    const user = await User.findById(userId)
    if(!user){
      return res.status(401).json({
        message:"User not found"
      })
    }
    return res.status(200).json({userData:user})
  }catch(error){
    res.send("error occcured!")
  }}

  //Reset password Api
  const resetPassword = async (req, res) => {
    try {
      const { Password, NewPassword, ConformPassword } = req.body;
      const userId = req.id;
      console.log("user id is: ",userId);
      console.log(req.body);
      if (!Password || !NewPassword || !ConformPassword) {
        return res.status(401).json({
          message: "All fields are required",
          success: false,
        });
      }
  
      
      if (NewPassword !== ConformPassword) {
        return res.status(400).json({
          message: "New Password and Confirm Password do not match",
          success: false,
        });
      }
  
      
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          message: "User not found",
          success: false,
        });
      }

      const isPasswordCorrect = await bcrypt.compare(Password, user.password);
      if (!isPasswordCorrect) {
        return res.status(403).json({
          message: "Current Password is incorrect",
          success: false,
        });
      }

      const hashedPassword = await bcrypt.hash(NewPassword, 10);

      user.password = hashedPassword;
      await user.save();
  
      res.status(200).json({
        message: "Password reset successfully",
        success: true,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
        success: false,
      });
    }
  };
  




module.exports = { signup, login,loadUser,clearcookies,resetPassword };
