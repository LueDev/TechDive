const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
  publicKey: { type: String, required: true, unique: true },
  privateKey: { type: String, required: true },
  revocationKey: { type: String, required: true },
});

// Index publicKey for faster lookups
authSchema.index({ publicKey: 1 }, { unique: true });

// Static method to find Auth document by publicKey
authSchema.statics.findByPublicKey = function (publicKey) {
  return this.findOne({ publicKey });
};

// Static method to find Auth document by privateKey
authSchema.statics.findByPrivateKey = function (privateKey) {
  return this.findOne({ privateKey });
};

// Static method to find Auth document by revocationKey
authSchema.statics.findByRevocationKey = function (revocationKey) {
  return this.findOne({ revocationKey });
};

const Auth = mongoose.model('Auth', authSchema);

module.exports = { Auth };
