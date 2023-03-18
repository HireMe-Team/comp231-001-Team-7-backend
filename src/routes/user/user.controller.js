const { getUserExample, register } = require("../.././models/user.model");

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

async function httpPostUpdatePassword(req, res) {
  //TODO: Get user id from cookies/localStorage
  // const id = req.
  //TODO: waiting for frontend to submit form, destructuring form the body to get old password and new password
  const { oldPassword, newPassword } = req.body;

  //TODO: if block: using bcrypt to verify old password, if return true then start changing password
  const result = await changePassword(id);
  if (result) {
    res.status(201).json({
      message: "Success",
    });
  } else {
    res.status(400).json({
      message: "failed",
    });
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
};
