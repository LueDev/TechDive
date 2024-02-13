const { User } = require('../models/userModel');
const { NotificationController } = require('../controllers/notification-controller')
const { Auth } = require('../models/authModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const getUser = async (req, res) => {
  
  return res.status(200).json({
    success: true,
    message: 'Users API is working.',
  });
};


// Registration controller
const registerUser = async (req, res) => {
  try {
    const userSignUpDetails = ({ firstname, lastname, email, password, admin } = req.body);
    const newUser = await User.createUser(userSignUpDetails);
    res.status(201).json({
      message: 'User registered successfully',
      user: newUser.safeFetch(),
      redirectTo: "/"
    }) //redirects to the exams page, "/" upon creation of user
  } catch (error) {
    res.status(500).json({
      message: 'Users Registration Error - Internal Server Error',
      error: error
    });
  }
};

// Login controller
const loginUser = async (req, res) => {
  console.log("LoginUser Page")
  try {
    const { email, password } = req.body;
    const userLoggedIn = await User.LoginUser(email, password);

    // Set expiration time for the JWT (15 minutes)
    const accessToken = jwt.sign(
      { user: userLoggedIn.safeFetch() }, // Payload
      process.env.ACCESS_TOKEN_SECRET, //secret - signature
      { algorithm: 'HS512', expiresIn: '15m' } // Header Expiration time
    );
    
    res.status(200).json({ accessToken: accessToken, redirectTo: "/" })
  } catch {
    res.status(500).json({
      error: 'User Login Error - Invalid Credentials',
    });
  }
};



const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']

  if(!authHeader){
    res.status(500).json({message: "Bearer token not present."})
  }else{
      //Bearer [Token] separated by a whitespace so split by whitespace and grab the second index, pos 1. 
     
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1]
      //Unathorized / Unauthenticated
      if (token == null) return res.status(401);

      //Handles server timeout in the event of a present bearer token but inaccurate to the 
      setTimeout(()=>{
        console.log("Inside JWT Verify timeout")
        return res.status(500).json({message: "Server timeout. Bearer token inaccurate."})
      }, 1500)

      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403); //Forbidden

        //otherwise, this user is who they say they are and we set req.user to user
        req.user = user;

        //next() calls the next operation after our middleware. This is like saying, we're done authenticating, please proceed with the next callback method
        next()
      })
  }
}


module.exports = {
  getUser,
  registerUser,
  loginUser,
  authenticateToken,
};
