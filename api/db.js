const mongoose = require('mongoose');
const { MongoClient } = require("mongodb");


const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      //'mongodb://localhost:27017/testdb',
      //'mongodb+srv://danntdg:danntdg@cluster0.h6byfpg.mongodb.net/'
      'mongodb+srv://quipe-main:quipe-main2@techdrive-cluster0.dnnuuvx.mongodb.net/'
    );

    
    const cliet = new MongoClient('mongodb+srv://quipe-main:quipe-main2@techdrive-cluster0.dnnuuvx.mongodb.net/')
    //const client = new MongoClient('mongodb+srv://danntdg:danntdg@cluster0.h6byfpg.mongodb.net/');
    //const database = client.db('sample_airbnb')
    
    console.log('MongoDB connected:', connection.connection.host);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit with failure
  }
};
//connectDB()

module.exports = connectDB;
