const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      'mongodb+srv://quipe-main:quipe-main2@techdrive-cluster0.dnnuuvx.mongodb.net/TechDive',
    );

    console.log('MongoDB connected:', connection.connection.host);
  } catch (error) {
    // TODO: Foward to error handler (?)
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
