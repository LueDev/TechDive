const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  event: { type: String, required: true },
  description: { type: String },
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users associated with the organization
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
});


notificationSchema.statics.pushEvent = async function (eventData) {
  const { eventType, description, user } = eventData;

  try{

  } catch (error){
    throw new Error('Error pushing event to MongoDB: ' + error.message);
  }
};

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
