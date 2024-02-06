const { User } = require("../models/userModel");
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
    const userSignUpDetails = { firstname, lastname, email, password, admin } = req.body;
    const newUser = await User.createUser(userSignUpDetails)
      
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser});
    }
  catch (error) {
    res.status(500).json({ error: "Users Registration Error - Internal Server Error" });
  }
};

// Login controller
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userLoggedIn = await User.LoginUser(email, password)

    res
    .status(200)
    .json({"user" : userLoggedIn.safeFetch()})
  }catch{
    res.status(500).json({error: "User Login Error - Internal Server Error"})
  }
};

module.exports = {
  getUser,
  registerUser,
  loginUser,
};
