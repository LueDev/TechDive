const mongoose = require("mongoose");
const { User } = require("../models/userModel");
const { Exam } = require("../models/examModel");

async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb://localhost:27017/testdb");
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    // Handle the error appropriately, such as throwing an exception or terminating the application
    process.exit(1);
  }
}

async function run() {
  try {
    // const user = new User({ firstname: "Raul", lastname: "De La Hoya", username: "Rico Suave", email: "jump@gmail.com", password: "Password1", admin: true });
    // // Save the user to the database
    // const savedUser = await user.save();
    // console.log(savedUser);

    // const foundUser = await User.find({ firstname: "Raul" });
    // console.log(foundUser);


    // Using .where is very handy 

    const foundUser = await User.find()
    const scrub = foundUser.forEach(user => user.safeFetch())
    console.log(foundUser.map(user => user.safeFetch()))

    // const foundExam = await Exam.where('LATEST WEIGHT').gt(290) 
    // console.log(foundExam)
    

  } catch (error) {
    console.error("Error encountered while querying user:", error);
  } finally {
    // Close the database connection after completing the operation
    await mongoose.connection.close();
  }
}

async function main() {
  await connectToDatabase();
  await run();
}

main()