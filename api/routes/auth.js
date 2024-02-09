const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth-controller');

router.get('/', AuthController.getPublicKey)
router.post('/receive-message', AuthController.sendMessage);


module.exports = router;
