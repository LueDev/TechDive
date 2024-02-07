const { User } = require("../models/userModel");
const jwt = require("jsonwebtoken");
require('dotenv').config()
const amqp = require("amqplib");

const getUser = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Users API is working.",
  });
};

// Registration controller
const registerUser = async (req, res) => {
  try {
    const userSignUpDetails = ({ firstname, lastname, email, password, admin } =
      req.body);
    const newUser = await User.createUser(userSignUpDetails);

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Users Registration Error - Internal Server Error" });
  }
};

// Login controller
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userLoggedIn = await User.LoginUser(email, password);

    //Without a refresh token operation, we shouldn't add expiration yet
    const accessToken = jwt.sign(userLoggedIn.safeFetch(), process.env.ACCESS_TOKEN_SECRET, {algorithm: "HS512"});

    res.status(200).json({ accessToken: accessToken});
  } catch {
    res.status(500).json({ error: "User Login Error - Internal Server Error" });
  }
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']

  if(!authHeader){
    res.status(500).json({message: "Bearer token not present."})
  }else{
      //Bearer [Token] separated by a whitespace so split by whitespace and grab the second index, pos 1. 
  const token = authHeader && authHeader.split(' ')[1]

  //Unathorized / Unauthenticated
  if(token == null) return res.status(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403) //Forbidden

    //otherwise, this user is who they say they are and we set req.user to user 
    req.user = user

    //next() calls the next operation after our middleware. This is like saying, we're done authenticating, please proceed with the next callback method
    next()
  })
  }

}


module.exports = {
  getUser,
  registerUser,
  loginUser,
  authenticateToken
};
