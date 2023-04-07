const { User, JobSeeker, Recruiter, Admin } = require("./user.mongo");
const bcrypt = require("bcrypt");
async function getUserCount() {
  try {
    const count = await User.countDocuments({});

    return count;
  } catch (error) {
    console.error(error);
    throw new Error("Error getting user count");
  }
}

// ------------------- Find user by id ---------------- //
async function finduser(id) {
  // Waiting for user Schema and userDb
  const user = await User.findOne({ userId: id });
  if (user) {
    return user;
  } else {
    return false;
  }
}

// ------------------- Find JobSeeker by id -------------//
async function findJobSeeker(id){
  const jobSeeker = await JobSeeker.findOne({userId:id});
  if (jobSeeker){
    return jobSeeker;
  }
    else {
    return false;
  }
}

// ------------------- Register ---------------- //
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

  // Hash the user's password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(user.password, saltRounds);

  // Create a new user based on the role
  let newUser;

  if (user.role === "job_seeker") {
    newUser = new JobSeeker({
      ...user,
      password: hashedPassword,
    });
    newUser.userId = (await getUserCount()) + 1;
  } else if (user.role === "recruiter") {
    newUser = new Recruiter({
      ...user,
      password: hashedPassword,
    });
    newUser.userId = (await getUserCount()) + 1;
    newUser.company = user.company;
  } else if (user.role === "admin") {
    newUser = new Admin({
      ...user,
      password: hashedPassword,
    });
    newUser.userId = (await getUserCount()) + 1;
  } else {
    throw new Error("Invalid user role");
  }

  // Save the user to the database
  console.log({ newUser });
  await newUser.save();

  return newUser;
}

// ------------------- Login ---------------- //
async function login(email, password) {
  // Check if the email exists in the JobSeeker collection
  const jobSeeker = await JobSeeker.findOne({ email });
  if (jobSeeker) {
    // If the email exists in the JobSeeker collection, compare the password
    const passwordMatch = await bcrypt.compare(password, jobSeeker.password);
    if (passwordMatch) {
      return jobSeeker;
    }
  }

  // Check if the email exists in the Recruiter collection
  const recruiter = await Recruiter.findOne({ email });


  if (recruiter) {
    if (!recruiter.approved) {
      throw new Error("Recruiter account not approved");
    }
    // If the email exists in the Recruiter collection, compare the password
    const passwordMatch = await bcrypt.compare(password, recruiter.password);
    if (passwordMatch) {
      return recruiter;
    }
  }
  // If the email does not exist in either collection or the password is incorrect, throw an error
  throw new Error("Invalid email or password");
}

// ------------------- Change Password ---------------- //
async function changePassword(id, oldPassword, newPassword) {
  // Find the user by ID
  const user = await finduser((userId = id));
  console.log({ user });
  if (user) {
    // Verify the old password matches
    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    if (passwordMatch) {
      // Hash the new password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
      console.log({ hashedPassword });
      // Update the user's password in the database
      try {
        const result = await User.findOneAndUpdate(
          { userId: id },
          { password: hashedPassword }
        );
        console.log({ result });
        return true;
      } catch (error) {
        throw new Error("Error updating password");
      }
    } else {
      throw new Error("Old password does not match");
    }
  } else {
    throw new Error("User not found");
  }
}

// ------------------- User add education ---------------- //
async function addEducation(userId, educationToAdd) {
  try {
    const user = await User.findOne({ userId: userId });
    user.education.push(educationToAdd);
    await user.save();
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
// ------------------- User add Experience ---------------- //
async function addExperience(userId, experienceToAdd) {
  try {
    const user = await User.findOne({ userId: userId });
    user.experience.push(experienceToAdd);
    await user.save();
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// ------------------- User add Profile Picture ---------------- //
async function addProfilePicture(userId, pictureToAdd) {
  const user = await finduser(userId);
  user.profileImage = pictureToAdd;
  try {
    await user.save();
    return true;
  } catch (error) {
    return error.message;
  }
}

// -------------------- User add a bookmarked job ----------------//
async function addBookmark(userId, jobPostToAdd) {
  try{
    const jobSeeker = await JobSeeker.findOne(userId);
    if(!jobSeeker.bookmarkedjobs.includes(jobPostToAdd.id)){ jobSeeker.bookmarkedjobs.push(jobPostToAdd.id);}
    await jobSeeker.save();
    return jobSeeker;
  } catch (error){
    return error.message;
  }
}
// -------------------- User remove a bookmarked job -------------//
async function removeBookmark(userId, jobPostToRemove) {
  try{
    const jobSeeker = await JobSeeker.findOne(userId);
    jobSeeker.bookmarkedjobs.pull(jobPostToAdd.id);
    await jobSeeker.save();
    return jobSeeker;
  } catch (error){
    return error.message;
  }
}
// --------------------- Get bookmarked jobs ---------------------//
async function getBookmarks(userId){
  try{
    const jobSeeker = await JobSeeker.findOne(userId);
    return jobSeeker.bookmarkedjobs;
  }catch(error){
    return error.message;
  }
}
module.exports = {
  changePassword,
  register,
  login,
  finduser,
  findJobSeeker,
  addEducation,
  addProfilePicture,
  addExperience,
  addBookmark,
  removeBookmark,
  getBookmarks,
};
