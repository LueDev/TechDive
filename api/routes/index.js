const express = require('express');
const { authenticateToken } = require('../controllers/user-controller');
const router = express.Router();

const ExamController = require('../controllers/exam-controller');

router.get('/', authenticateToken, ExamController.getExams);
router.get('/exam/:id', authenticateToken, ExamController.getExams); //update controller
router.patch('/exam/:id', authenticateToken, ExamController.updateExam); //update controller
router.delete('/exam/:id', authenticateToken, ExamController.createExam); // update controller
router.post('/create', authenticateToken, ExamController.createExam); //update controller

module.exports = router;
