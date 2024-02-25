const { User } = require('../models/userModel');
const NotificationController = require('../controllers/notification-controller');
const { Auth } = require('../models/authModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const getUser = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Users API is working.',
  });
};

const findUser = async (internalid) => {
  const foundUser = await User.findOne({ internalid: internalid });
  return foundUser.safeFetch();
};

const checkEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    user === null ? res.status(200).send(true) : res.status(200).send(false);
  } catch (error) {
    console.log('User email check failed: ', error);
    res.status(401).send(false);
  }
};

// Registration controller
const registerUser = async (req, res) => {
  try {
    const userSignUpDetails = ({ firstname, lastname, email, password, admin } =
      req.body);

    const newUser = await User.createUser(userSignUpDetails);
    const payload = { user: newUser };
    const secretKey = process.env.ACCESS_TOKEN_SECRET;
    const options = { algorithm: 'HS256', 
      // expiresIn: '15m' 
    };
    const accessToken = jwt.sign(payload, secretKey, options);

    console.log('ACCESS TOKEN: ', accessToken);

    try {
      try {
        await NotificationController.pushRegistrationEvent({
          message: 'User Registration Event',
          endpoint: 'POST: /Register',
          user: payload.user,
          timestamp: Date.now(),
        });
      } catch (error) {
        console.log('RabbitMQ Is Offline: ');
      }
    } catch (err) {
      console.log('Error connecting to RabbitMQ: ', err);
    }

    res.status(201)
    .json({ success: true, accessToken: accessToken });
  } catch(error) {
    console.log("Error with registration: ", error)
    res.status(500).json({
      success: false,
      message: 'User Registration Error',
      description:
        'The user schema was not followed during the registration process.',
    });
  }
};

const loginUser = async (req, res) => {
  console.log('User Login Page Reached');
  try {
    const { email, password } = req.body;
    const userLoggedIn = await User.LoginUser(email, password);
    const payload = { user: userLoggedIn };
    const secretKey = process.env.ACCESS_TOKEN_SECRET;
    const options = { algorithm: 'HS256', expiresIn: '15m' };

    const accessToken = jwt.sign(payload, secretKey, options);

    try {
      try {
        await NotificationController.pushLoginEvent({
          message: 'User Login Event',
          endpoint: 'POST: /Login',
          user: payload,
          timestamp: Date.now(),
        });
      } catch (error) {
        console.log('Error pushing to login queue: ', error);
      }
    } catch (err) {
      console.log('Error connecting to RabbitMQ: ', err);
    }

    res
      .status(200)
      .json({ success: true, accessToken: accessToken});
  } catch {
    res.status(500).json({
      error: 'User Login Error - Invalid Credentials',
    });
  }
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  // console.log(req.headers.authorization);

  if (!authHeader) {
    res.json({ message: 'Bearer token not present.', req: req });
  }
  //Bearer [Token] separated by a whitespace so split by whitespace and grab the second index, pos 1.
  const token = authHeader && authHeader.split(' ')[1];

  //Unathorized / Unauthenticated
  if (token == null) return res.status(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(401); //Unauthorized
    req.user = user;
    //next() calls the next operation after our middleware. This is like saying, we're done authenticating, please proceed with the next callback method
    next();
  });
};

module.exports = {
  getUser,
  checkEmail,
  registerUser,
  loginUser,
  authenticateToken,
  findUser,
};
