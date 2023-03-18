const express = require("express");
const {
  httpGetUserExample,
  httpPostUpdatePassword,
  httpPostRegister,
} = require("./user.controller");

const userRouter = express.Router();

userRouter
  .get("/example", httpGetUserExample)
  .post("/register", httpPostRegister)
  .post("change-password", httpPostUpdatePassword);

module.exports = userRouter;
