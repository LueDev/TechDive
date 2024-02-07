const { Exam } = require('../models/examModel');

const getExams = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'API is working.',
  });
};
