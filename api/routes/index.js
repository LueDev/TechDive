const express = require('express');
const { authenticateToken } = require('../controllers/user-controller');
const router = express.Router();

const UserController = require('../controllers/user-controller');

router.get('/', authenticateToken, UserController.getUser);

module.exports = router;
