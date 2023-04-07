const { Job } = require("./jobs.mongo");

async function getAllJobs() {
  try {
    const jobs = await Job.find({});
    return jobs;
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function searchJobs(keyword, type = "") {
  try {
    // Define the search criteria
    const searchCriteria = {
      $text: { $search: keyword },
    };
    if (type !== "") {
      searchCriteria.type = type;
    }

    // Search for job posts using the search criteria
    const jobPosts = await Job.find(searchCriteria).exec();

    return jobPosts;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to search for job posts.");
  }
}


async function getJobById(_id) {
  try {
    const job = await Job.findById(_id);
    return job;
  } catch (err) {
    console.error(err);
    throw new Error("Error getting job by id");
  }
}

async function getJobsByRecruiter(recruiterId) {
  try {
    const jobs = await Job.find({ recruiterId: recruiterId });
    return jobs;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting jobs by recruiter id");
  }
}

async function createJobPosting(jobPosting) {
  try {
    const job = new Job(jobPosting);
    const savedJob = await job.save();
    return savedJob;
  } catch (error) {
    throw new Error(`Error creating job posting: ${error.message}`);
  }
}

async function updateJobPosting(_id, jobPosting) {
  try {
    const updatedJobPosting = await Job.findByIdAndUpdate(_id, jobPosting, {
      new: true,
    });
    return updatedJobPosting;
  } catch (error) {
    console.error(`Error updating job posting with id ${_id}:`, error);
    throw new Error("Error updating job posting");
  }
}
async function deleteJobPosting(_id) {
  try {
    const deletedJobPosting = await Job.findByIdAndDelete(_id);
    return deletedJobPosting;
  } catch (error) {
    console.error("Error deleting job posting: ", error);
    throw new Error("Error deleting job posting");
  }
}

module.exports = {
  getAllJobs,
  createJobPosting,
  getJobById,
  updateJobPosting,
  deleteJobPosting,
  getJobsByRecruiter,
  searchJobs,
};
