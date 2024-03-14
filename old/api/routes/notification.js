const express = require('express');

const router = express.Router();

const NotificationController = require('../controllers/notification-controller');

router.get('/', NotificationController.getNotification);

module.exports = router;
