let mongoose = require("mongoose");

// job posting schema
let jobModel = mongoose.Schema(
  {
    position: {
      //job title
      type: String,
      default: "",
      trim: true,
      required: "job title is required",
    },
    company: {
      type: String,
      default: "",
      trim: true,
      required: "company name is required",
    },
    type: {
      //full-time, part-time, contract
      type: String,
      default: "",
      trim: true,
      required: "job type is required",
    },
    description: {
      //job description
      type: String,
      default: "",
      trim: true,
      required: "job description is required",
    },
    qualifications: {
      type: String,
      default: "",
      trim: true,
      required: "job qualifications is required",
    },
    salary: {
      type: String, //string because some can put a number, range, hourly rate, confidential, etc
      default: "",
      trim: true,
    },
    status: {
      //open or closed
      type: String,
      default: "",
      required: "status is required",
    },
    createDate: {
      type: Date,
      default: "",
      required: true,
    },
    closingDate: {
      type: Date,
      default: "",
    },
    recruiterId: {
      type: Number,
      required: true,
    },
    applications: [
      {
        userId: { type: Number, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        resume: { type: String },
      },
    ],
  },
  {
    collection: "jobs",
  }
);
jobModel.index({ description: "text", qualifications: "text" });

module.exports.Job = mongoose.model("job", jobModel);
