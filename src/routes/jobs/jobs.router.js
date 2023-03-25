const express = require("express");
const {
  httpGetAllJobs,
  httpPostCreateJobPosting,
  httpGetJobById,
  httpPutUpdateJobPosting,
  httpDeleteJobPosting,
} = require("./jobs.controller");
const jobsRouter = express.Router();

jobsRouter
  .get("/all-jobs", httpGetAllJobs)
  .get("/job-details/:id", httpGetJobById)
  .put("/job-details/update/:id", httpPutUpdateJobPosting)
  .post("/create-job-postings", httpPostCreateJobPosting)
  .delete("/job-details/update/:id", httpDeleteJobPosting);

module.exports = jobsRouter;
