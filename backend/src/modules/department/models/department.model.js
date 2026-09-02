import mongoose from "mongoose";

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
  },
  { timestamps: true }
);

export default mongoose.model("Department", departmentSchema);
