import mongoose from "mongoose";

const universitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    proposals: [
      {
        challengeId: String,
        projectTitle: String,
        proposalText: String,
        teamLead: String,
        submittedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    projects: [
      {
        id: String,
        title: String,
        category: String,
        leadResearcher: String,
        budget: String,
        status: {
          type: String,
          default: "IN_PROGRESS",
        },
        progressPercentage: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("University", universitySchema);
