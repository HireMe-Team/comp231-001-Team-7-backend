const userRouter = require("./user/user.router");
const express = require("express");
const adminRouter = require("./admin/admin.router");
const jobsRouter = require("./jobs/jobs.router");
const api = express.Router();

api.use("/users", userRouter);
api.use("/admin", adminRouter);
api.use("/jobs", jobsRouter);
module.exports = api;
