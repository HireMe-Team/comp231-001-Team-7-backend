const express = require("express");
const {
  httpGetAllJobs,
  httpPostCreateJobPosting,
  httpGetJobById,
  httpPutUpdateJobPosting,
  httpDeleteJobPosting,
  httpGetJobsByRecruiterId,
  httpGetSearchJobs,
  httpPostSubmitApplication,
} = require("./jobs.controller");
const jobsRouter = express.Router();

jobsRouter
  .get("/all-jobs", httpGetAllJobs)
  .get("/search", httpGetSearchJobs)
  .get("/recruiter-jobs/:id", httpGetJobsByRecruiterId)
  .get("/job-details/:id", httpGetJobById)
  .put("/job-details/update/:id", httpPutUpdateJobPosting)
  .post("/create-job-postings", httpPostCreateJobPosting)
  .post("/submit-application", httpPostSubmitApplication)
  .delete("/job-details/update/:id", httpDeleteJobPosting);

module.exports = jobsRouter;
