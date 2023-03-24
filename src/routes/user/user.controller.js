
const { getUserExample, register } = require("../.././models/user.model");
const JobSeeker = require("./user.mongo");
const {
  getUserExample,
  register,
  login,
  changePassword,
} = require("../.././models/user.model");

const jwt = require("jsonwebtoken");


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

  try {
    // Authenticate the user with the provided email and password
    const user = await login(email, password);

    // Generate a JWT token for the user
    const token = jwt.sign(
      { userId: user.userId, role: user.role },
      process.env.JWT_SECRET
    );

    // Set the token in a cookie and send a success response
    res.cookie("token", token, { httpOnly: true });
    res.status(200).send({ success: true });
  } catch (error) {
    // If the login fails, send an error response
    res.status(401).send({ success: false, message: error.message });
  }
}

async function httpPostUpdatePassword(req, res) {
  const { oldPassword, newPassword } = req.body;
  const id = getUserIdFromToken(req)
  console.log({id, oldPassword, newPassword});

  try {
    // Update the user's password
    await changePassword(id, oldPassword, newPassword);
    
    // If the password update is successful, send a success response
    res.status(200).send({ success: true });
  } catch (error) {
    // If the password update fails, send an error response
    res.status(400).send({ success: false, message: error.message });
  }
}

async function httpGetUserExample(req, res) {
  data = await getUserExample();
  res.status(200).json(data);
}

module.exports = {
  httpPostUpdatePassword,
  httpGetUserExample,
  httpPostRegister,
  httpPostLogin,
};

module.exports.getJobSeekerById = async (req, res, next) => {
  let id = req.params.id;
  let jobSeeker = await JobSeeker.findById(id);
  res.locals.jobSeeker = jobSeeker;
  
  return next();
}