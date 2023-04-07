const mongoose = require("mongoose");

// Education subSchema
const EducationSchema = new mongoose.Schema({
  degree: {
    type: String,
    required: true,
  },
  institution: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    enum: ["High School", "Associate", "Bachelor", "Master", "PhD"],
    required: true,
  },
});

// Work Experience Schema
const ExperienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
});
// Job Seeker Schema
const JobSeekerSchema = new mongoose.Schema({
  skills: {
    type: [String],
    required: false,
  },
  experience: {
    type: [ExperienceSchema],
    required: false,
  },
  education: {
    type: [EducationSchema],
    required: false,
  },
  bookmarkedjobs: [{ type : mongoose.Schema.Types.ObjectId, ref:"job"}],
});

// Recruiter Schema
const RecruiterSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  approved: {
    type: Boolean,
    required: false
  }
});

// Admin Schema
const AdminSchema = new mongoose.Schema({
  isAdmin: {
    type: Boolean,
    required: true,
    default: true,
  },
});

// User Schema
const UserSchema = new mongoose.Schema({
  userId: {
    type: Number,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["job_seeker", "recruiter", "admin"],
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    required: false,
  },
  bio: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
const User = mongoose.model("User", UserSchema);
module.exports = {
  User,
  EducationSchema,
  JobSeeker: User.discriminator("JobSeeker", JobSeekerSchema),
  Recruiter: User.discriminator("Recruiter", RecruiterSchema),
  Admin: User.discriminator("Admin", AdminSchema),
  
};
