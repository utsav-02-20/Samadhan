import mongoose from "mongoose";
import testDbConnection from "../../../config/testDb.js";

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      unique: true,
      uppercase: true,
      trim: true,
    },
    head: {
      type: String,
      default: "Department Head",
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    membersCount: {
      type: Number,
      default: 1,
    },
    assignedChallenges: [
      {
        problemId: String,
        title: String,
        status: {
          type: String,
          enum: ["ASSIGNED", "IN_PROGRESS", "RESOLVED"],
          default: "ASSIGNED",
        },
        assignedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    acceptedProjects: [
      {
        id: String,
        title: String,
        university: String,
        leadResearcher: String,
        budgetGranted: String,
        status: {
          type: String,
          default: "IN_PROGRESS",
        },
        progressPercentage: {
          type: Number,
          default: 0,
        },
        acceptedDate: String,
        targetCompletion: String,
        abstract: String,
        deliverables: [
          {
            name: String,
            status: String,
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

export default testDbConnection.model("Department", departmentSchema);
