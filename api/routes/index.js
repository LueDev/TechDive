const express = require('express');
const { authenticateToken } = require('../controllers/user-controller');
const router = express.Router();
const ExamController = require('../controllers/exam-controller');

//Get Specific Exams
router.get('/exams/patient/:patientId', ExamController.getOnePatientExams);
router.get('/exam/:examId', ExamController.getOneSpecificExam);
router.get('/', authenticateToken, ExamController.getExams); //router.get('/', authenticateToken, ExamController.getExams);
// router.get('/patient/:id', ExamController.getOnePatient); //individual exam controller with JWT: router.get('/exam/:id', authenticateToken, ExamController.getExams);
// router.get('/exam/:id', ExamController.getOneExam); //individual exam controller with JWT: router.get('/exam/:id', authenticateToken, ExamController.getExams);
router.patch('/exam/:id', ExamController.updateExam); //update individual exam with JWT controller: router.patch('/exam/:id', authenticateToken, ExamController.updateExam);
router.delete('/exam/:id', ExamController.deleteExam); // delete individual exam with JWT controller: router.delete('/exam/:id', authenticateToken, ExamController.createExam);
router.post('/create', ExamController.createExam); //create individual exam with JWT controller: router.post('/create', authenticateToken, ExamController.createExam);

module.exports = router;
