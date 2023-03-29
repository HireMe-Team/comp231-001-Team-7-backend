const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  userMessage: {
    postedTime: {
      type: Date,
      required: false,
    },
    message: {
      type: String,
      required: false,
    },
  },
  adminReply: {
    postedTime: {
      type: Date,
    },
    message: {
      type: String,
    },
  },
});

module.exports.messageSchema = mongoose.model("Message", messageSchema);
