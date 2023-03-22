const express = require("express");
const {
  httpGetUserExample,
  httpPostUpdatePassword,
  httpPostRegister,
  httpPostLogin,
} = require("./user.controller");

const userRouter = express.Router();

userRouter
  .get("/example", httpGetUserExample)
  .post("/register", httpPostRegister)
  .post("/login", httpPostLogin)
  .post("change-password", httpPostUpdatePassword);

module.exports = userRouter;
