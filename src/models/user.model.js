const { User, JobSeeker, Recruiter } = require("./user.mongo");

async function getUserCount() {
  try {
    const count = await User.countDocuments({});

    return count;
  } catch (error) {
    console.error(error);
    throw new Error("Error getting user count");
  }
}

async function finduser(id) {
  // Waiting for user Schema and userDb
  const user = await userDb.findOne({ id });
  if (user) {
    return user;
  } else {
    return false;
  }
}

async function register(user) {
  // Check if the email is already registered
  const existingJobSeeker = await JobSeeker.findOne({ email: user.email });
  if (existingJobSeeker) {
    throw new Error("Email already registered");
  }

  // Check if the email is already registered for recruiters
  const existingRecruiter = await Recruiter.findOne({ email: user.email });
  if (existingRecruiter) {
    throw new Error("Email already registered");
  }
  // Create a new user based on the role
  let newUser;
  newUser.userId = (await getUserCount()) + 1;
  if (user.role === "job_seeker") {
    newUser = new JobSeeker(user);
  } else if (user.role === "recruiter") {
    newUser = new Recruiter(user);
  } else {
    throw new Error("Invalid user role");
  }

  // Save the user to the database
  await newUser.save();

  return newUser;
}

async function changePassword(id, oldPassword, newPassword) {
  user = await finduser(id);
  if (user) {
    //TODO: findOneAndUpdate the password
    // Try catch block, if success return true, otherwise return false and raise exception
  }
}

async function getUserExample() {
  return { "api testing": "123" };
}

module.exports = {
  getUserExample,
  changePassword,
  register,
};
