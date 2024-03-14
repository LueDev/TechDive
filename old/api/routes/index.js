const express = require('express');
const { authenticateToken } = require('../controllers/user-controller');

const ExamController = require('../controllers/exam-controller');

const router = express.Router();

router.get('/exams/:patientId/examsId/:examId', ExamController.getBasedExamID);
router.get('/exams/:patientId', ExamController.getSpecificExams);
router.get('/', ExamController.getExams);
router.get('/exam/:id', ExamController.getExams);

router.patch('/exam/:id', authenticateToken, ExamController.updateExam);

router.delete('/exam/:id', authenticateToken, ExamController.createExam);

router.post('/create', ExamController.createExam);

module.exports = router;
