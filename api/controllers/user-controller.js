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

// Registration controller
const registerUser = async (req, res) => {
  try {
    const userSignUpDetails = ({ firstname, lastname, email, password, admin } =
      req.body);
    const newUser = await User.createUser(userSignUpDetails);

    try {
      NotificationController.pushRegistrationEvent({
        message: "User has registered.",
        endpoint: "POST: /Register",
        user: newUser.safeFetch(),
        timestamp: Date.now(),
      });
    } catch (error) {
      console.log('RabbitMQ Is Offline: ');
    }

    res.status(201).json({
      message: 'User registered successfully',
      user: newUser.safeFetch(),
      redirectTo: '/',
    }); //redirects to the exams page, "/" upon creation of user
  } catch (error) {
    res.status(500).json({
      message: 'Users Registration Error - Internal Server Error',
      error: error,
    });
  }
};

// Login controller
const loginUser = async (req, res) => {
  console.log('User Login Page Reached');
  try {
    const { email, password } = req.body;
    const userLoggedIn = await User.LoginUser(email, password);

    const payload = { user: userLoggedIn };
    // console.log("PAYLOAD: ", payload)
    const secretKey = process.env.ACCESS_TOKEN_SECRET;
    // console.log("SECRET: ", secretKey)
    const options = { algorithm: 'HS256', expiresIn: '15m' };
    // console.log("OPTIONS: ", options)

    // Set expiration time for the JWT (15 minutes)
    const accessToken = await jwt.sign(
      payload,
      secretKey,
      options,
      function (err, data) {
        if (err) {
          console.log('Error during JWT creation: ', err);
        } else {
          // console.log("Created JWT Token Successfully: ", data )
          try {
            NotificationController.pushLoginEvent({
              message: "User has registered.",
              endpoint: "POST: /Login",
              user: payload,
              timestamp: Date.now(),
            });
          } catch (error) {
            console.log('RabbitMQ Is Offline: ');
          }
          res
            .status(200)
            .json({ accessToken: data, redirectTo: 'http://localhost:9000/' });
        }
      },
    );
  } catch {
    res.status(500).json({
      error: 'User Login Error - Invalid Credentials',
    });
  }
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    res.status(500).json({ message: 'Bearer token not present.' });
  } else {
    //Bearer [Token] separated by a whitespace so split by whitespace and grab the second index, pos 1.

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    //Unathorized / Unauthenticated
    if (token == null) return res.status(401);

    //Handles server timeout in the event of a present bearer token but inaccurate to the
    //TODO: the timeout causes this error: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    // Need another way to measure time to then display res.status(500)
    // setTimeout(()=>{
    //   console.log("Inside JWT Verify timeout")
    //   return res.status(500).json({message: "Server timeout. Bearer token inaccurate."})
    // }, 1500)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(401); //Unauthorized

      //otherwise, this user is who they say they are and we set req.user to user
      req.user = user;

      //next() calls the next operation after our middleware. This is like saying, we're done authenticating, please proceed with the next callback method
      next();
    });
  }
};

module.exports = {
  getUser,
  registerUser,
  loginUser,
  authenticateToken,
};
