const userRouter = require("./user/user.router");
const express = require("express");

const api = express.Router();

api.use("/api/users", userRouter);

module.exports = api;
