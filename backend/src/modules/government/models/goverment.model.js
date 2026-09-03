import mongoose from "mongoose";

const governmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    contactEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    contactPhone: {
      type: String,
      trim: true,
      default: "",
    },

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  }
);

const Government = mongoose.model("Government", governmentSchema);

const challengeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: String,
    targetDepartment: String,
    assignedDepartmentId: String,
    district: String,
    budget: String,
    slaDays: {
      type: Number,
      default: 14,
    },
    status: {
      type: String,
      enum: ["OPEN", "ROUTED", "IN_PROGRESS", "RESOLVED"],
      default: "OPEN",
    },
  },
  { timestamps: true }
);

export const Challenge = mongoose.model("Challenge", challengeSchema);

export default Government;
