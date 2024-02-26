const amqp = require('amqplib');
require('dotenv').config();
const { App } = require('@slack/bolt');

const rabbitMQUrl = process.env.CLOUDAMQPS_URI;
// const slackWebhookUrl = process.env.SLACK_WEBHOOK;
// const app = new App({
//   signingSecret: process.env.SLACK_SIGNING_SECRET,
//   token: process.env.SLACK_BOT_TOKEN,
// });

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

// const postMessage = async (message) => {
//   await app.client.chat.postMessage({
//     token: process.env.SLACK_BOT_TOKEN,
//     channel: process.env.SLACK_CHANNEL,
//     text: `${message.message}\n${message.user}\n`,
//   });
// };

const consumeMessages = async (queueName) => {
  let connection, channel;
  try {
    ({ connection, channel } = await connectToRabbitMQ());
    await channel.assertQueue(queueName);
    await channel.consume(queueName, (message) => {
      console.log('Event received from queue:', message.content.toString());
      sendMessageToSlack(
        `New message from ${queueName} queue: ${message.content.toString()}`,
      );
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

const NotificationController = {
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

  pushOperationsEvent: async (operationData) => {
    try {
      const channel = await connectToRabbitMQ();
      await channel.assertQueue('operations');
      await channel.sendToQueue(
        'operations',
        Buffer.from(JSON.stringify(operationData)),
      );
      postMessage(operationData);
      console.log('Event pushed to operations queue:', operationData);
    } catch (error) {
      console.error('Failed to push event to operations queue:', error);
      throw error;
    }
  },

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
