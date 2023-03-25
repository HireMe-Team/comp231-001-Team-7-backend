const jwt = require("jsonwebtoken");
const uuid = require("uuid");
// const { getUserExample, register } = require("../.././models/user.model");
const JobSeeker = require("../../models/user.mongo");
const {
  register,
  login,
  changePassword,
  finduser,
  addEducation,
  addExperience,
  addProfilePicture,
} = require("../../models/user/user.model");
const { createIssue } = require("../../models/admin/issues/issues.model");



function getUserIdFromToken(req) {
  // Get the JWT token from the cookie
  const lastHeader = req.rawHeaders[[req.rawHeaders.length - 1]]
  const token = lastHeader.split('=')[1];
  console.log({token});

  if (token) {
    try {
      // Decode the JWT token to retrieve the userId
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded.userId;
    } catch (error) {
      // If there's an error decoding the token, return null
      return null;
    }
  } else {
    // If there's no token, return null
    return null;
  }
}
//User Register
async function httpPostRegister(req, res) {
  try {
    // Get the user data from the request body
    const {
      email,
      password,
      role,
      firstName,
      lastName,
      phoneNumber,
      profileImage,
      bio,
      location,
      company,
    } = req.body;

    // Create a new user object
    const newUser = {
      email,
      password,
      role,
      firstName,
      lastName,
      phoneNumber,
      profileImage,
      bio,
      location,
      company,
      approved: false,
    };

    // Register the new user
    console.log(newUser);
    const user = await register(newUser);

    // Return a success message and the user object
    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function httpPostLogin(req, res) {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    // Authenticate the user with the provided email and password
    const user = await login(email, password);

    // Generate a JWT token for the user
    const token = jwt.sign({ user }, process.env.JWT_SECRET);

    // Set the token in a cookie and send a success response
    res.cookie("token", token, { httpOnly: true });
    res.status(200).send({ success: true, token, userId: user.userId });
  } catch (error) {
    // If the login fails, send an error response
    res.status(401).send({ success: false, message: error.message });
  }
}

async function httpPostUpdatePassword(req, res) {
  const { userId, currentPassword, newPassword } = req.body;
  try {
    // Update the user's password
    await changePassword(userId, currentPassword, newPassword);

    // If the password update is successful, send a success response
    res.status(200).send({ success: true });
  } catch (error) {
    // If the password update fails, send an error response
    res.status(400).send({ success: false, message: error.message });
  }
}

async function httpGetLogout(req, res, next) {
  req.logout(function (err) {
    if (err) {
      res.status(400).json({
        success: false,
        message: err,
      });
    }
    res.status(200).json({
      success: true,
    });
  });
}

async function httpGetUserById(req, res) {
  try {
    const id = req.params.id;
    const user = await finduser(id);
    res.status(200).json(user);
  } catch (error) {
    console.error("Error getting user: ", error);
    res.status(500).json({ message: "Error getting user" });
  }
}

async function httpPostAddEducation(req, res) {
  const userId = req.body.userId;
  const education = req.body.education;
  console.log(education);

  try {
    const updatedUser = await addEducation(userId, education);
    console.log({ updatedUser });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding education to user" });
  }
}

async function httpPostAddExperience(req, res) {
  const userId = req.body.userId;
  const experience = req.body.experience;
  console.log(experience);

  try {
    const updatedUser = await addExperience(userId, experience);
    console.log({ updatedUser });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding Experience to user" });
  }
}

async function httpPostAddProfilePic(req, res) {
  const { userId, url } = req.body;
  try {
    const result = await addProfilePicture(userId, url);
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({ success: false });
  }
}

// User create issue
async function httpPostCreateIssue(req, res) {
  try {
    const { title, userId, issueDetail } = req.body;
    const issueId = uuid.v4();
    const newIssue = {
      issueID: issueId,
      title,
      userId,
      issueDetail,
      status: "pending",
      reportDate: new Date(),
    };
    const issue = await createIssue(newIssue);
    res.status(201).json(issue);
  } catch (error) {
    console.error("Error creating issue: ", error);
    res.status(500).json({ message: "Error creating issue" });
  }
}

module.exports = {
  httpPostUpdatePassword,
  httpPostRegister,
  httpPostLogin,
  httpGetUserById,
  httpGetLogout,
  httpPostAddEducation,
  httpPostAddProfilePic,
  httpPostAddExperience,
  httpPostCreateIssue,
};
