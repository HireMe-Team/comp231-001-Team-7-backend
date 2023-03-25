const {
  getAllJobs,
  createJobPosting,
  getJobById,
  updateJobPosting,
  deleteJobPosting,
} = require("../../models/jobs/jobs.model");

async function httpGetAllJobs(req, res) {
  try {
    const jobs = await getAllJobs();
    return res.status(200).json(jobs);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error getting all jobs.");
  }
}

async function httpPostCreateJobPosting(req, res) {
  const jobPosting = req.body;
  try {
    const newJobPosting = await createJobPosting(jobPosting);
    res.status(201).json(newJobPosting);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating job posting");
  }
}

async function httpGetJobById(req, res) {
  const { id } = req.params;
  try {
    const job = await getJobById(id);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }
    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function httpPutUpdateJobPosting(req, res) {
  try {
    const { id } = req.params;
    const jobPosting = req.body;
    const updatedJobPosting = await updateJobPosting(id, jobPosting);
    res.status(200).json(updatedJobPosting);
  } catch (error) {
    console.error("Error updating job posting: ", error);
    res.status(500).send("Error updating job posting");
  }
}

async function httpDeleteJobPosting(req, res) {
  try {
    const { id } = req.params;
    await deleteJobPosting(id);
    res.sendStatus(204); // success, no content
  } catch (error) {
    console.error("Error deleting job posting: ", error);
    res.status(500).send("Error deleting job posting");
  }
}

module.exports = {
  httpGetAllJobs,
  httpPostCreateJobPosting,
  httpGetJobById,
  httpPutUpdateJobPosting,
  httpDeleteJobPosting,
};
