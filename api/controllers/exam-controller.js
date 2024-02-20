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

// Retrieving Specific Patient Exams
const getSpecificExams = async (req, res) => {
  const patientId = req.params.patientId;
  console.log(`Exams for patient ${patientId}`);

  try {
    const exams = await Exam.find({ patientId: patientId }).limit(50);
    return res.status(200).json({
      exams: exams,
    });
  } catch (error) {
    console.error('Error fetching exams:', error);
    return res.status(500).json({ message: 'Error fetching exams' });
  }
};

// Get Exams Based on Exam ID and Patient ID 
const getBasedExamID = async (req, res) => {
  const examId = req.params.examId;
  const patientId = req.params.patientId;
  
  console.log(`Exams for Exam ID ${examId}`);

  try {
    const exams = await Exam.find({ examId: examId, patientId: patientId  }).limit(50);
    return res.status(200).json({
      exams: exams,
    });
  } catch (error) {
    console.error('Error fetching exams:', error);
    return res.status(500).json({ message: 'Error fetching exams' });
  }
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
  getSpecificExams,
  getBasedExamID,
  createExam,
  updateExam,
  deleteExam,
};
