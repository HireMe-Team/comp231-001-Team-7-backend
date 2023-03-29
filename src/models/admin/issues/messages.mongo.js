const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  messageID: {
    type: String,
    required: true,
    unique: true
  },
  userMessage: {
    postedTime: {
      type: Date,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },
  adminReply: {
    postedTime: {
      type: Date
    },
    message: {
      type: String
    }
  }
});

module.exports = mongoose.model('Message', messageSchema);
