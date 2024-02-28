const express = require('express');
const router = express.Router();

const ExamController = require('../controllers/exam-controller');
const UserController = require('../controllers/user-controller');

router.get('/', ExamController.getExams);
router.post('/receive-message', ExamController.createExam);
router.delete('/exams/:id', ExamController.deleteExam);
router.put('/exams/up/:id', ExamController.updateExam);

module.exports = router;
