const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // const connection = await mongoose.connect(
    //   'mongodb://localhost:27017/testdb',
    // );
    const connection = await mongoose.connect(
      'mongodb+srv://quipe-main:quipe-main2@techdrive-cluster0.dnnuuvx.mongodb.net/TechDive',
    );
    
    console.log('MongoDB connected:', connection.connection.host);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;