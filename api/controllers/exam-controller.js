const jwt = require('jsonwebtoken');
const { Exam } = require('../models/examModel');
const { Notification } = require('../models/notificationModel');
const amqp = require('amqplib');

const getExams = async (req, res) => {
  console.log('Exams page');

  const exams = await Exam.find().limit(50);
  // console.log(exams)

  return res.status(200).json({
    exams: exams,
  });
};

const createExam = async (req, res) => {
  console.log('Create Exams endpoint reached');

  try {
    //Get the user performing this action. AuthenticateToken stored the user in req.user
    const user = req.user;
    res.status(200).json({
      success: true,
      message: 'Create Exams API is working.',
    });
  } catch (error) {
    console.log(error);
  }
};

const updateExam = async (req, res) => {
  console.log('Update Exams endpoint reached');

  try {
    //Get the user performing this action. AuthenticateToken stored the user in req.user
    const user = req.user;
    res.status(200).json({
      success: true,
      message: 'Update Exams API is working.',
    });
  } catch (error) {
    console.log(error);
  }
};

// const deleteExam = async (req, res) => {
//   console.log('Delete Exams endpoint reached');

//   try {
//     //Get the user performing this action. AuthenticateToken stored the user in req.user
//     const user = req.user;
//     res.status(200).json({
//       success: true,
//       message: 'Delete Exams API is working.',
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

const deleteExam = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedExam = await Exam.deleteExam(id);
    
    if (!deletedExam) { // If null, meaning no document was found/deleted
      return res.status(404).json({
        success: false,
        message: "Exam not found",
      });
    }

    res.status(200).json({ 
      success: true, 
      message: "Exam deleted successfully" 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: "Exam not found or can't delete" 
    });
  }
};
module.exports = {
  getExams,
  createExam,
  updateExam,
  deleteExam,
};
