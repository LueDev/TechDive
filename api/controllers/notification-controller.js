const amqp = require('amqplib');
const fetch = require('node-fetch');
require('dotenv').config();

// RabbitMQ connection URL
const rabbitMQUrl = process.env.LOCAL_AMQPS;
const slackWebhookUrl = process.env.SLACK_WEBHOOK;


// Function to establish RabbitMQ connection
const connectToRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(rabbitMQUrl);
    const channel = await connection.createChannel();
    return channel;
  } catch (error) {
    console.error('RabbitMQ is offline', error);
    throw error;
  }
};

const closeRabbitMQConnection = async (connection, channel) => {
  try {
    await channel.close();
    await connection.close();
  } catch (error) {
    console.error('Error closing RabbitMQ connection', error);
    throw error;
  }
};


const sendMessageToSlack = async (message) => {
  try {
    const response = await fetch(slackWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: message }),
    });
    console.log('Message sent to Slack:', message);
  } catch (error) {
    console.error('Error sending message to Slack:', error);
    throw error;
  }
};

const consumeMessages = async (queueName) => {
  let connection, channel;
  try {
    ({ connection, channel } = await connectToRabbitMQ());
    await channel.assertQueue(queueName);
    await channel.consume(queueName, (message) => {
      console.log('Event received from queue:', message.content.toString());
      sendMessageToSlack(`New message from ${queueName} queue: ${message.content.toString()}`);
    });
  } catch (error) {
    console.error(`Failed to consume messages from ${queueName} queue:`, error);
    throw error;
  } finally {
    if (connection && channel) {
      await closeRabbitMQConnection(connection, channel);
    }
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
      await channel.sendToQueue(
        'registration',
        Buffer.from(JSON.stringify({ newRegistration: userData })),
      );
      console.log('Event pushed to registration queue:', {
        newRegistration: userData,
      });
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
      await channel.sendToQueue(
        'operations',
        Buffer.from(JSON.stringify(operationData)),
      );
      console.log('Event pushed to operations queue:', operationData);
    } catch (error) {
      console.error('Failed to push event to operations queue:', error);
      throw error;
    }
  },

  // Controller method to handle GET request for notifications
  getNotification: async (req, res) => {
    try {
      const channel = await connectToRabbitMQ();
      await channel.assertQueue('operations');
      await channel.consume('operations', (message) => {
        console.log(
          'Event received from operations queue: ',
          message.content.toString(),
        );
        res.status(200).json({
          success: true,
          message: JSON.parse(message.content.toString()),
        });
      });
    } catch (error) {
      console.error('Failed to push event to operations queue:', error);

      throw error;
    }
  },

  consumeOperationsQueue: async () => {
    await consumeMessages('operations');
  },

  consumeRegistrationQueue: async () => {
    await consumeMessages('registration');
  },

  consumeLoginQueue: async () => {
    await consumeMessages('login');
  },
};

module.exports = NotificationController;

