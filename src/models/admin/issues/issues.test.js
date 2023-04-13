const { mongoConnect, mongoDisconnect } = require("../../../services/mongo");
const { getIssueById } = require("./issues.model");
const { issue } = require("./issues.mongo");
const uuid = require("uuid");

beforeAll(async () => {
  await mongoConnect();
});

afterAll(async () => {
  await mongoDisconnect();
});

describe("getIssueById", () => {
  it("returns the correct issue when given a valid ID", async () => {
    const test_id = uuid.v4();
    const issues = new issue({
      issueID: test_id,
      title: "Test Issue",
      userId: 12345,
      issueDetail: "This is a test issue",
      status: "pending",
      reportDate: new Date(),
    });
    await issues.save();

    const result = await getIssueById(test_id);
    expect(result.issueID).toEqual(test_id);
    expect(result.title).toEqual("Test Issue");
    expect(result.userId).toEqual(12345);
    expect(result.issueDetail).toEqual("This is a test issue");
    expect(result.status).toEqual("pending");
    expect(result.reportDate).toBeInstanceOf(Date);
  });

  it("throws an error when given an invalid ID", async () => {
    expect.assertions(2);

    try {
      await getIssueById("non-existent-issue-id");
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual(
        "Error getting issue by ID non-existent-issue-id"
      );
    }
  });
});
