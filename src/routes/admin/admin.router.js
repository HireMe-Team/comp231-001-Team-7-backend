const express = require("express");
const {
  httpPostAdminLogin,
  httpGetAllRecruiter,
  httpGetTotalUser,
  httpGetUnapprovedRecruiter,
  httpPutApproveRecruiter,
  httpGetAllJobSuggestions,
  httpPostCreateJobHuntSuggestions,
  httpGetAllIssues,
  httpGetIssueById,
  httpPutIssueApproved,
  httpPutAdminAddMessage,
  httpGetMessage,
} = require("./admin.controller");
const adminRouter = express.Router();

adminRouter
  .get("/recruiters", httpGetAllRecruiter)
  .get("/total-users", httpGetTotalUser)
  .get("/unapproved-recruiters", httpGetUnapprovedRecruiter)
  .get("/job-hunting-tips/all", httpGetAllJobSuggestions)
  .get("/issues/all", httpGetAllIssues)
  .get("/issue-details/:id", httpGetIssueById)
  .get("/issue-details/:id/get-message",httpGetMessage)
  .post("/login", httpPostAdminLogin)
  .post("/job-hunting-tips/create", httpPostCreateJobHuntSuggestions)
  .put("/approve-recruiter/:id", httpPutApproveRecruiter)
  .put("/issues/solved", httpPutIssueApproved)
  .put("/issue-details/:id/add-message", httpPutAdminAddMessage);

module.exports = adminRouter;
