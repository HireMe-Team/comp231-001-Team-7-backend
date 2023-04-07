const express = require("express");
const {
  httpPostUpdatePassword,
  httpPostRegister,
  getJobSeekerById,
  httpPostLogin,
  httpGetUserById,
  httpGetLogout,
  httpPostAddEducation,
  httpPostAddProfilePic,
  httpPostAddExperience,
  httpPostCreateIssue,
  httpGetIssueById,
  httpGetBookmarks,
  httpAddBookmark,
  httpRemoveBookmark,
} = require("./user.controller");

const userRouter = express.Router();

userRouter
  .get("/user/issues/:userId", httpGetIssueById)
  .get("/user/:id", httpGetUserById)
  .get("/logout", httpGetLogout)
  .post("/register", httpPostRegister)
  .post("/login", httpPostLogin)
  .post("/change-password", httpPostUpdatePassword)
  .post("/add-education", httpPostAddEducation)
  .post("/add-experience", httpPostAddExperience)
  .post("/upload-profile-pic", httpPostAddProfilePic)
  .post("/issue/create", httpPostCreateIssue)
  .get("/user/bookmarks", httpGetBookmarks)
  .post("/user/remove-bookmark", httpRemoveBookmark)
  .post("/user/add-bookmark", httpAddBookmark);

module.exports = userRouter;
