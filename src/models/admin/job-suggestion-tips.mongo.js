const mongoose = require("mongoose");

const jobHuntingTipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});

const JobHuntingTip = mongoose.model("JobHuntingTip", jobHuntingTipSchema);

module.exports = JobHuntingTip;
