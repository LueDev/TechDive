const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { Exam } = require('../models/examModel');
const NotificationController = require('./notification-controller');

const getExams = async (req, res) => {
  console.log('Exams page');

  const exams = await Exam.find();

  try {
    NotificationController.pushOperationsEvent({
      message: "User has reached the home page.",
      endpoint: "GET /",
      user: req.user.user,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.log(
      'RabbitMQ Is Offline or Authorize Token is not set on the route: ',
      error,
    );
  }

  res.status(200).json({
    exams: exams,
  });
};
//needs authentication
const createExam = async (req, res) => {
  console.log('Create Exams endpoint reached');

    try {
      NotificationController.pushOperationsEvent({
        message: "User has reached the home page. (endpoint = '/')",
        endpoint: "POST /create",
        user: req.user.user,
        timestamp: Date.now(),
      });
    } catch (error) {
      console.log(
        'RabbitMQ Is Offline or Authorize Token is not set on the route: ',
        error,
      );
    }

    res.status(200).json({
      success: true,
      message: 'Create Exams API is working.',
    });

};



const updateExam = async (req, res) => {
  console.log('Update Exams endpoint reached');

  try {
    const examIdentifier = req.params.id;
    const updateData = req.body;

    const oldExamDetails = await Exam.findOne({examId: updateData.examId})

    const updatedExam = await Exam.findOneAndUpdate(
      { examId: examIdentifier },
      updateData,
      { new: true },
    );

    if (!updatedExam) {
      return res.status(404).json({
        success: false,
        message: 'Exam not found',
      });
    }

    try {
      NotificationController.pushOperationsEvent({
        message: "User has updated an exam",
        previousExam: oldExamDetails,
        exam: updatedExam,
        endpoint: "PATCH: /exam/:id",
        user: req.user.user,
        timestamp: Date.now(),
      });
    } catch (error) {
      console.log(
        'RabbitMQ Is Offline or Authorize Token is not set on the route: ',
        error,
      );
    }

    console.log("OLD EXAM : ", oldExamDetails)
    console.log("NEW EXAM : ", updatedExam)
    res.status(200).json({
      success: true,
      message: 'Exam updated successfully',
      prevExamDetails: oldExamDetails,
      message: 'Exam updated successfully',
      exam: updatedExam,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,

      message: 'An error occurred while updating the exam',

      error: error.message,
    });
  }
};

const deleteExam = async function (req, res) {
  try {
    const id = req.params.id

    console.log(id)
    const examToDelete = await Exam.findExam(id)
    const deletedExam = await Exam.deleteExam(id);

    if (!deletedExam) {
      // If null, meaning no document was found/deleted
      return res.status(404).json({
        success: false,
        message: 'Exam not found',
      });
    }

       try {
        NotificationController.pushOperationsEvent({
        message: "User has deleted an exam",
        exam: examToDelete,
        user: req.user.user,
        endpoint: "DELETE: /exam/:id",
        timestamp: Date.now(),
      });
    } catch (error) {
      console.log(
        'RabbitMQ Is Offline or Authorize Token is not set on the route: '
        // error,
      );
    }    

    res.status(200).json({
      success: true,
      message: 'Exam deleted successfully',
      exam: examToDelete
    });

   
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: "Exam not found or can't delete" 
    });
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Exam not found or can't delete",
    });
  }
};
module.exports = {
  getExams,
  createExam,
  updateExam,
  deleteExam,
};
