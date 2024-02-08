const express = require('express');
const { authenticateToken } = require('../controllers/user-controller');
const router = express.Router();

const ExamController = require('../controllers/exam-controller');

router.get('/', authenticateToken, ExamController.getExams);

module.exports = router;
