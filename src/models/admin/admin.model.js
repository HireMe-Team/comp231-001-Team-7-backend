const { User, Admin, Recruiter } = require("../user/user.mongo");
const JobHuntingTip = require("./job-suggestion-tips.mongo");
const bcrypt = require("bcrypt");

async function adminLogin(email, password) {
  // Check if the email exists in the JobSeeker collection
  const admin = await Admin.findOne({ email });
  if (admin) {
    // If the email exists in the JobSeeker collection, compare the password
    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (passwordMatch) {
      return admin;
    }
  }
  // If the email does not exist in either collection or the password is incorrect, throw an error
  throw new Error("Invalid email or password");
}

async function getAllRecruiter() {
  try {
    const recruiters = await Recruiter.find();
    return recruiters;
  } catch (err) {
    console.error(err);
  }
}
async function getTotalUser() {
  try {
    const count = await User.countDocuments();
    return count;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getUnapprovedRecruiter() {
  try {
    const unapprovedRecruiters = await Recruiter.find({
      approved: false,
    }).exec();
    return unapprovedRecruiters;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get unapproved recruiters");
  }
}
async function approveRecruiter(userId) {
  try {
    const recruiter = await Recruiter.findOneAndUpdate(
      { userId },
      { approved: true },
      { new: true }
    );
    if (!recruiter) {
      throw new Error(`Recruiter with userId ${userId} not found`);
    }
    return recruiter;
  } catch (error) {
    throw new Error(`Failed to approve recruiter: ${error.message}`);
  }
}
// ---------------------- Job hunting tips --------------------- //
async function getAllJobSuggestions() {
  try {
    const jobSuggestions = await JobHuntingTip.find({});
    return jobSuggestions;
  } catch (error) {
    console.error(error);
    return [];
  }
}
async function createJobSuggestions(jobSuggestions) {
  try {
    const tip = new JobHuntingTip({
      title: jobSuggestions.title,
      body: jobSuggestions.body,
    });
    await tip.save();
    return tip;
  } catch (error) {
    console.error("Error creating job hunting tips: ", error);
    throw new Error("Error creating job hunting tips");
  }
}

module.exports = {
  adminLogin,
  getAllRecruiter,
  getTotalUser,
  getUnapprovedRecruiter,
  approveRecruiter,
  getAllJobSuggestions,
  createJobSuggestions,
};
