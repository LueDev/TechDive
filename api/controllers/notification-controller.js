const { User } = require('../models/userModel');
const amqp = require('amqplib');

// RabbitMQ connection URL
const rabbitMQUrl = 'amqp://localhost';

// Function to establish RabbitMQ connection
const connectToRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(rabbitMQUrl);
    const channel = await connection.createChannel();
    return channel;
  } catch (error) {
    console.error('Failed to connect to RabbitMQ:', error);
    throw error;
  }
};

// User controller methods
const NotificationController = {
  // Method to push event to login queue
  pushLoginEvent: async (userData) => {
    try {
      const channel = await connectToRabbitMQ();
      await channel.assertQueue('login');
      await channel.sendToQueue('login', Buffer.from(JSON.stringify(userData)));
      console.log('Event pushed to login queue:', userData);
    } catch (error) {
      console.error('Failed to push event to login queue:', error);
      throw error;
    }
  },

  // Method to push event to registration queue
  pushRegistrationEvent: async (userData) => {
    try {
      const channel = await connectToRabbitMQ();
      await channel.assertQueue('registration');
      await channel.sendToQueue('registration', Buffer.from(JSON.stringify({newRegistration: userData})));
      console.log('Event pushed to registration queue:', {newRegistration: userData});
    } catch (error) {
      console.error('Failed to push event to registration queue:', error);
      throw error;
    }
  },

  // Method to push event to operations queue
  pushOperationsEvent: async (operationData) => {
    try {
      const channel = await connectToRabbitMQ();
      await channel.assertQueue('operations');
      await channel.sendToQueue('operations', Buffer.from(JSON.stringify(operationData)));
      console.log('Event pushed to operations queue:', operationData);
    } catch (error) {
      console.error('Failed to push event to operations queue:', error);
      throw error;
    }
  },

  // Controller method to handle GET request for notifications
  getNotification: async (req, res) => {
    return res.status(200).json({
      success: true,
      message: 'Notifications API is working.',
    });
  }
};

module.exports = NotificationController;
