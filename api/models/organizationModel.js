const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users associated with the organization
  exams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exam' }], // Exams associated with the organization
  admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Admin users of the organization
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  updatedAt: { type: Date, default: () => Date.now() }
});

const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;
