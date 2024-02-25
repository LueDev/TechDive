const { Exam } = require('../models/examModel');
const NotificationController = require('./notification-controller');

const getExams = async (req, res) => {
  console.log('Exams page');

  const exams = await Exam.find();

  try {
    NotificationController.pushOperationsEvent({
      message: 'User has retrieved all exams.',
      endpoint: 'GET /',
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

// Retrieving Specific Exams
const getOnePatientExams = async (req, res) => {
  const patientId = req.params.patientId;
  console.log(`Exams for patient ${patientId}`);

  try {
    const exams = await Exam.find({ patientId: patientId });

    try {
      NotificationController.pushOperationsEvent({
        message: 'User has retrieved the exams for a patient',
        endpoint: 'GET /exams/:patientId',
        user: req.user.user,
        patientId: patientId,
        exams: exams,
        timestamp: Date.now(),
      });
    } catch (error) {
      console.log(
        'RabbitMQ Is Offline or Authorize Token is not set on the route: ',
      );
    }
    return res.status(200).json({
      success: true,
      exams: exams,
    });
  } catch (error) {
    console.error('Error fetching exams:', error);
    return res.status(500).json({ message: 'Error fetching exams' });
  }
};

// Retrieving Specific Exams
const getOneSpecificExam = async (req, res) => {
  const examId = req.params.examid;

  const exam = await Exam.findExam({ examId: examId });

  console.log(exam)
  // if (exam.examId == null) {
  //   return res.status(500).json({ message: 'Error fetching exams' });
  // }

  try {
    NotificationController.pushOperationsEvent({
      message: 'User has retrieved a single exam',
      endpoint: 'GET /exam/:examId',
      user: req.user.user,
      examId: examId,
      exam: exam,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.log(
      'RabbitMQ Is Offline or Authorize Token is not set on the route: ',
    );
  }
  return res.status(200).json({
    success: true,
    exam: exam,
  });
};

const createExam = async (req, res) => {
  console.log('Create Exams endpoint reached');

  const newExamDetails = req.body;

  const examFound = await Exam.find({ examId: newExamDetails.examId });

  try {
    if (examFound) {
      return res.status;
    }
  } catch (err) {}

  try {
    try {
      await NotificationController.pushOperationsEvent({
        message: "User has reached the home page. (endpoint = '/')",
        endpoint: 'POST /create',
        user: req.user.user,
        timestamp: Date.now(),
      });
    } catch (error) {
      console.log(
        'RabbitMQ Is Offline or Authorize Token is not set on the route: ',
        error,
      );
    }
  } catch (err) {
    console.log('Error connecting to RabbitMQ');
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

    const oldExamDetails = await Exam.findExam({ examId: updateData.examId });

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
      try {
        await NotificationController.pushOperationsEvent({
          message: 'User has updated an exam',
          previousExam: oldExamDetails,
          exam: updatedExam,
          endpoint: 'PATCH: /exam/:id',
          user: req.user,
          timestamp: Date.now(),
        });
      } catch (error) {
        console.log(
          'RabbitMQ Is Offline or Authorize Token is not set on the route: ',
          error,
        );
      }
    } catch (err) {
      console.log('Error connecting to RabbitMQ');
    }

    // console.log('OLD EXAM : ', oldExamDetails);
    // console.log('NEW EXAM : ', updatedExam);
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
    const id = req.params.id;

    console.log(id);
    const examToDelete = await Exam.findExam(id);
    const deletedExam = await Exam.deleteExam(id);

    if (!deletedExam) {
      // If null, meaning no document was found/deleted
      return res.status(404).json({
        success: false,
        message: 'Exam not found',
      });
    }

    try {
      try {
        await NotificationController.pushOperationsEvent({
          message: 'User has deleted an exam',
          exam: examToDelete,
          user: req.user.user,
          endpoint: 'DELETE: /exam/:id',
          timestamp: Date.now(),
        });
      } catch (error) {
        console.log(
          'RabbitMQ Is Offline or Authorize Token is not set on the route: ',
        );
      }
    } catch (err) {
      console.log('Error connecting to RabbitMQ');
    }

    res.status(200).json({
      success: true,
      message: 'Exam deleted successfully',
      exam: examToDelete,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Exam not found or can't delete",
    });
  }
};

module.exports = {
  getExams,
  getOnePatientExams,
  getOneSpecificExam,
  createExam,
  updateExam,
  deleteExam,
};
