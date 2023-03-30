const { issue } = require("./issues.mongo");
const { messageSchema } = require("./messages.mongo");
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
    const newMessageTree = new messageSchema();
    newIssue.replyMessage = newMessageTree._id;
    const savedIssue = await newIssue.save();
    await newMessageTree.save();
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
    console.log({ issueResult });
    return issueResult;
  } catch (error) {
    console.error(`Error getting issue by ID ${issueID}: ${error}`);
    throw new Error(`Error getting issue by ID ${issueID}`);
  }
}

async function markIssueAsSolved(issueID) {
  try {
    const issueToApprove = await issue.findOne({ issueID });
    if (!issueToApprove) throw new Error("Issue not found");

    issueToApprove.status = "solved";
    await issueToApprove.save();

    return issueToApprove;
  } catch (error) {
    console.error("Error marking issue as solved:", error);
    throw new Error("Error marking issue as solved");
  }
}
async function adminAddMessage(message, issueID) {
  const issueToAddMessage = await issue.findOne({ issueID });
  const messageID = issueToAddMessage.replyMessage;
  const messageToEdit = await messageSchema.findById(messageID);
  messageToEdit.adminReply.message = message;
  messageToEdit.adminReply.postedTime = new Date();
  const result = await messageToEdit.save();
  if (!result) {
    return false;
  }
  return true;
}

async function getMessages(issueID) {
  const issueToAddMessage = await issue.findOne({ issueID });
  const messageID = issueToAddMessage.replyMessage;
  const message = await messageSchema.findById(messageID);
  return message ? message : null;
}

async function getIssuesByUserId(userId) {
  return await issue.find({ userId });
}
module.exports = {
  getAllIssues,
  createIssue,
  getIssueById,
  markIssueAsSolved,
  adminAddMessage,
  getMessages,
  getIssuesByUserId
};
