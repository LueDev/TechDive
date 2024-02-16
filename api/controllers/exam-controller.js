const jwt = require('jsonwebtoken');
const { Exam } = require('../models/examModel');
const { Notification } = require('../models/notificationModel');
const amqp = require('amqplib');

const getExams = async (req, res) => {
  console.log('Exams page');

  const exams = await Exam.find();

  return res.status(200).json({
    success: true,
    message: 'All exams successfully fetched',
    exams: exams
  });
};

const getOneExam = async (req, res) => {
  console.log('Individual Exam API');

  const examData = {
    patientId,
    examId,
    age,
    sex,
    bmi,
    zipCode,
    imageURL,
    keyFindings,
    brixiaScores,
  } = req.body
  const exam = await Exam.find(examData);

  return res.status(200).json({
    success: true,
    message: 'Exam successfully fetched',
    exam: exam,
  });
};

const getOnePatient = async (req, res) => {
  console.log('Individual Patient API');

  const examData = ({
    patientId,
    examId,
    age,
    sex,
    bmi,
    zipCode,
    imageURL,
    keyFindings,
    brixiaScores,
  } = req.params);
  const patientData = await Exam.find({patientId: examData.patientId});

  return res.status(200).json({
    success: true,
    message: 'Patient successfully fetched',
    'exam(s)': patientData,
  });
};

const createExam = async (req, res) => {
  console.log('Create Exams endpoint reached');
  try {
    const examData = ({
      patientId,
      examId,
      age,
      sex,
      bmi,
      zipCode,
      imageURL,
      keyFindings,
      brixiaScores,
    } = req.body);
    const newExam = await Exam.createExam(examData);
    res.status(201).json({
      success: true,
      message: 'Exam created successfully',
      exam: newExam,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Exam Creation Error - Internal Server Error',
      error: error,
    });
  }
};

const updateExam = async (req, res) => {
  console.log('Update Exams endpoint reached');
  try {
    const examData = ({
      patientId,
      examId,
      age,
      sex,
      bmi,
      zipCode,
      imageURL,
      keyFindings,
      brixiaScores,
    } = req.body);
    const updatedExam = await Exam.createExam(examData);
    res.status(200).json({
      success: true,
      message: 'Exam updated successfully',
      updatedExam: updatedExam,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Exam Creation Error - Internal Server Error',
      error: error,
    });
  }
};

const deleteExam = async (req, res) => {
  console.log('Delete Exams endpoint reached');

  try {
    const examData = ({
      patientId,
      examId,
      age,
      sex,
      bmi,
      zipCode,
      imageURL,
      keyFindings,
      brixiaScores,
    } = req.body);
    const updatedExam = await Exam.deleteExam(examData);
    res.status(200).json({
      success: true,
      message: 'Exam updated successfully',
      updatedExam: updatedExam,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Exam Creation Error - Internal Server Error',
      error: error,
    });
  }
};

module.exports = {
  getExams,
  getOneExam,
  getOnePatient,
  createExam,
  updateExam,
  deleteExam,
};
