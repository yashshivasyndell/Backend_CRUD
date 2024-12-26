const jwt = require("jsonwebtoken");
require("dotenv").config();

const isAuthenticated = async (req, res, next) => {
  try {
    
    const {AuthToken} = req.cookies;

    if (!AuthToken) {
      return res.status(401).json({ message: "token is missing" });
    }
    const decodedtoken = jwt.verify(AuthToken, process.env.jwt_secret);
    if (!decodedtoken) {
      return res.status(401).json({ message: "token mismatched" });
    }

    const currentTime = Math.floor(Date.now() / 1000); 

    if (decodedtoken.exp < currentTime) {
      return res.status(401).json({ message: 'Token has expired' });
    }

    console.log("success he");
    req.id = decodedtoken._id;
    next();
  } catch (error) {
    console.log("Error ho gyi!!");
    console.log("error: ", error);
  }
};

module.exports = isAuthenticated;
