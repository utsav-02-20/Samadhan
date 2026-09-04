import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  department: { type: String, default: "Computer Science" },
  college: { type: String },
  role: { type: String, default: "Member" },
});

const teamSchema = new mongoose.Schema(
  {
    teamName: {
      type: String,
      required: true,
      trim: true,
    },
    problemId: {
      type: String,
      required: true,
      index: true,
    },
    challengeTitle: {
      type: String,
      default: "Civic Challenge Solution",
    },
    collegeName: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: String,
      trim: true,
    },
    teamLeader: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, default: "" },
      college: { type: String },
      department: { type: String },
    },
    teamMembers: [teamMemberSchema],
    proposedSolution: {
      title: { type: String, default: "Proposed Solution" },
      description: { type: String, default: "" },
      pptUrl: { type: String, default: "" },
      docUrl: { type: String, default: "" },
      githubUrl: { type: String, default: "" },
      fileName: { type: String, default: "" },
    },
    status: {
      type: String,
      enum: ["UNDER_REVIEW", "ACCEPTED", "REJECTED", "APPROVED"],
      default: "UNDER_REVIEW",
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Team", teamSchema);
