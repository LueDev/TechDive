const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // const connection = await mongoose.connect(
    //   'mongodb://localhost:27017/testdb',
    // );
    const connection = await mongoose.connect(
      process.env.MONGO_URI,
    );
    
    console.log('MongoDB connected:', connection.connection.host);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;