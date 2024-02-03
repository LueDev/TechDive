const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');


// Express app
const app = express();

// Enable CORS for all routes 
app.use(cors())

// Mongoose to connect to MongoDB 
mongoose.connect('your-mongodb-connection-string', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware to parse JSON
app.use(express.json());

// Use the user routes
app.use('/api', userRoutes);

//Nodemailer middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
