const { issue } = require("./issues.mongo");

async function getAllIssues() {
  try {
    const issues = await issue.find({});
    return issues;
  } catch (error) {
    console.error("Error getting issues: ", error);
    throw new Error("Error getting issues");
  }
}
async function createIssue(issueData) {
  try {
    const newIssue = new issue(issueData);
    const savedIssue = await newIssue.save();
    return savedIssue;
  } catch (error) {
    console.error("Error creating issue:", error);
    throw new Error("Error creating issue");
  }
}

async function getIssueById(issueID) {
  try {
    const issueResult = await issue.findOne({ issueID });
    if (!issueResult) {
      throw new Error(`Issue with ID ${issueID} not found`);
    }
    console.log({issueResult});
    return issueResult;
  } catch (error) {
    console.error(`Error getting issue by ID ${issueID}: ${error}`);
    throw new Error(`Error getting issue by ID ${issueID}`);
  }
}

module.exports = {
  getAllIssues,
  createIssue,
  getIssueById,
};
