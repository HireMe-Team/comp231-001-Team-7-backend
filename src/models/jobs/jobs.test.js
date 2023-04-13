const { mongoConnect, mongoDisconnect } = require("../../services/mongo");
const { getJobById } = require("./jobs.model");
const { Job } = require("./jobs.mongo");

describe("getJobById", () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  it("should return a job when given a valid id", async () => {
    const jobData = {
      position: "Software Developer",
      company: "Acme Inc.",
      type: "Full-time",
      description:
        "We are seeking a talented software developer to join our team.",
      qualifications:
        "Bachelor's degree in Computer Science, 3+ years of experience in software development, etc.",
      salary: "$80,000 - $100,000",
      status: "open",
      createDate: new Date(),
      recruiterId: 1234,
    };
    const savedJob = await Job.create(jobData);

    const foundJob = await getJobById(savedJob._id);

    expect(foundJob).toBeDefined();
    expect(foundJob._id).toEqual(savedJob._id);
    expect(foundJob.position).toEqual(jobData.position);
  });

  it("should throw an error when given an invalid id", async () => {
    const invalidId = "not-a-valid-id";

    await expect(getJobById(invalidId)).rejects.toThrow(
      "Error getting job by id"
    );
  });
});
