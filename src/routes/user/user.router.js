const express = require("express");
const { httpPostUpdatePassword } = require("./user.controller");

const userRouter = express.Router();

userRouter.post("change-password", httpPostUpdatePassword);

module.exports = userRouter;
