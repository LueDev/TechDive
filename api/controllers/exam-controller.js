const jwt = require('jsonwebtoken');
const { Exam } = require('../models/examModel');

const getExams = async (req, res) => {
  console.log("Exams page")

  return res.status(200).json({
    success: true,
    message: 'Exams API is working.'
  });
};

const updateExam = async (req, res) => {
  console.log("Update Exams endpoint reached")

  return res.status(200).json({
    success: true,
    message: 'Exams API is working.'
  });
};

module.exports = {
  getExams,
};
