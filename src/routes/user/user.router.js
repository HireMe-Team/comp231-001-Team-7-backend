const express = require("express");
const {
  httpGetUserExample,
  httpPostUpdatePassword,
  httpPostRegister,
  getJobSeekerById
} = require("./user.controller");

const userRouter = express.Router();

userRouter
  .get("/example", httpGetUserExample)
  .post("/register", httpPostRegister)
  .post("change-password", httpPostUpdatePassword);


userRouter.get('/:id', [getJobSeekerById], async (req, res, next) => {
  res.json(res.locals.jobSeeker);
});

module.exports = userRouter;
