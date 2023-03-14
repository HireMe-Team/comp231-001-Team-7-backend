const express = require("express");

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

module.exports = {
  httpPostUpdatePassword,
};
