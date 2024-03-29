const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user-controller');

router.get('/', UserController.getUser);
router.post('/login', UserController.loginUser);
router.post('/register', UserController.registerUser);
router.get('/checkemail/:email', UserController.checkEmail);
router.put('/users/:userId', UserController.updateUser);

module.exports = router;
