const express = require('express');
const { authenticateToken } = require('../controllers/user-controller');
const router = express.Router();

const ExamController = require('../controllers/exam-controller');

router.get('/', ExamController.getExams); //router.get('/', authenticateToken, ExamController.getExams);
router.get('/exam/:id', ExamController.getExams); //individual exam controller with JWT: router.get('/exam/:id', authenticateToken, ExamController.getExams);
router.patch('/exam/:id', authenticateToken, ExamController.updateExam); //update individual exam with JWT controller: router.patch('/exam/:id', authenticateToken, ExamController.updateExam);
router.delete('/exam/:id', authenticateToken, ExamController.createExam); // delete individual exam with JWT controller: router.delete('/exam/:id', authenticateToken, ExamController.createExam);
router.post('/create', authenticateToken, ExamController.createExam); //create individual exam with JWT controller: router.post('/create', authenticateToken, ExamController.createExam);

module.exports = router;
