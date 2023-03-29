const jwt = require("jsonwebtoken");
const {
  getAllRecruiter,
  adminLogin,
  getTotalUser,
  getUnapprovedRecruiter,
  approveRecruiter,
  getAllJobSuggestions,
  createJobSuggestions,
} = require("../../models/admin/admin.model");
const {
  getAllIssues,
  getIssueById,
  markIssueAsSolved,
  adminAddMessage,
} = require("../../models/admin/issues/issues.model");
async function httpPostAdminLogin(req, res) {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    // Authenticate the user with the provided email and password
    const user = await adminLogin(email, password);

    // Generate a JWT token for the user
    const token = jwt.sign({ user }, process.env.JWT_SECRET);

    // Set the token in a cookie and send a success response
    res.cookie("token", token, { httpOnly: true });
    res.status(200).send({ success: true, token, userId: user.userId });
  } catch (error) {
    // If the login fails, send an error response
    res.status(401).send({ success: false, message: error.message });
  }
}

async function httpGetAllRecruiter(req, res) {
  try {
    const recruiters = await getAllRecruiter();
    res.status(200).json(recruiters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}
async function httpGetTotalUser(req, res) {
  try {
    const totalUsers = await getTotalUser();
    res.status(200).json({ totalUsers });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
}
async function httpGetUnapprovedRecruiter(req, res) {
  try {
    const unapprovedRecruiters = await getUnapprovedRecruiter();
    res.status(200).json(unapprovedRecruiters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function httpPutApproveRecruiter(req, res) {
  const { userId } = req.body;
  console.log(userId);

  try {
    await approveRecruiter(userId);
    res.status(200).send(`Recruiter with user ID ${userId} approved`);
  } catch (error) {
    console.error(`Error approving recruiter with user ID ${userId}: `, error);
    res.status(500).send("An error occurred while approving the recruiter");
  }
}
// ---------------------- Job hunting tips --------------------- //
async function httpGetAllJobSuggestions(req, res) {
  try {
    const jobSuggestions = await getAllJobSuggestions();
    res.status(200).json(jobSuggestions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function httpPostCreateJobHuntSuggestions(req, res) {
  try {
    const jobSuggestions = req.body;
    const newJobSuggestions = await createJobSuggestions(jobSuggestions);
    res.status(201).json(newJobSuggestions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// ---------------------- Issues --------------------- //
async function httpGetAllIssues(req, res) {
  try {
    const issues = await getAllIssues();
    res.status(200).json(issues);
  } catch (error) {
    console.error("Error getting issues: ", error);
    res.status(500).json({ message: "Error getting issues" });
  }
}

async function httpGetIssueById(req, res) {
  const issueID = req.params.id;
  console.log({ issueID });
  try {
    const issue = await getIssueById(issueID);

    if (!issue) {
      res.status(404).send(`Issue with ID ${issueID} not found`);
      return;
    }
    res.json(issue);
  } catch (error) {
    console.error(`Error getting issue by ID ${issueID}: ${error}`);
    res.status(500).send("Error getting issue");
  }
}

async function httpPutIssueApproved(req, res) {
  const issueID = req.body.issueID;
  try {
    const result = await markIssueAsSolved(issueID);
    if (!result) {
      res.status(404).send(`Issue with ID ${issueID} not found`);
      return;
    }
    res.json(result);
  } catch (error) {
    console.error(`Error make issue ${issueID} approved: ${error}`);
    res.status(500).send(error);
  }
}

async function httpPutAdminAddMessage(req, res) {
  const message = req.body.message;
  const issueID = req.params.id;
  try {
    const addMessageResult = await adminAddMessage(message, issueID);
    console.log({addMessageResult});
    if (!addMessageResult) {
      res.status(404).json({
        success: false,
        message: `Unable to add admin message to ${issueID}`,
      });
    }
    res.status(200).json({success: true})
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

module.exports = {
  httpPostAdminLogin,
  httpGetAllRecruiter,
  httpGetTotalUser,
  httpGetUnapprovedRecruiter,
  httpPutApproveRecruiter,
  httpGetAllJobSuggestions,
  httpPostCreateJobHuntSuggestions,
  //Issue
  httpGetAllIssues,
  httpGetIssueById,
  httpPutIssueApproved,
  httpPutAdminAddMessage,
};
