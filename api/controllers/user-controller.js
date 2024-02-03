const User = require('../models/userModel')

const getUser = async (req, res) => {
  
  return res.status(200).json({
    success: true,
    message: 'API is working.'
  });
}

// Registration controller
const registerUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const newUser = new User({ firstname: firstname, lastname: lastname, email:email, password:password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Login controller
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      return res.status(200).json({ message: 'Login successful' });
    } else {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



module.exports = {
  getUser, registerUser, loginUser
};
