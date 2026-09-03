/**
 * ============================================================================
 * File: problem.model.js
 * Module: Problems
 * ============================================================================
 *
 * Purpose:
 * Defines the Mongoose schema and model for citizen-reported problems
 * in the Samadhan backend.
 *
 * Functionality:
 * - Stores complaint details submitted by citizens.
 * - Saves category, title, description, district, and village/locality.
 * - Stores live GPS location (latitude & longitude).
 * - Stores uploaded image URLs from Cloudinary.
 * - Tracks complaint workflow status.
 * - Maintains community upvotes.
 * - References the Citizen who created the complaint.
 *
 * Used By:
 * - problem.service.js
 * - problem.controller.js
 * ============================================================================
 */

import mongoose from "mongoose";

const problemSchema = new mongoose.Schema(
  {
    // Citizen who submitted the complaint
    citizenId: {
      type: mongoose.Schema.Types.Mixed,
      ref: "Citizen",
      required: true,
    },

    // Complaint title
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // Detailed description
    description: {
      type: String,
      required: true,
      trim: true,
    },

    // Complaint category
    category: {
      type: String,
      required: true,
      enum: [
        "Water Supply",
        "Roads",
        "Electricity",
        "Sanitation",
        "Healthcare",
        "Education",
        "Garbage",
        "Drainage",
        "Street Lights",
        "Public Transport",
        "Other",
      ],
    },

    // District
    district: {
      type: String,
      required: true,
      trim: true,
    },

    // Village / Locality
    locality: {
      type: String,
      required: true,
      trim: true,
    },

    // Live GPS location
    location: {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
    },

    // Cloudinary image URLs
    images: [
      {
        type: String,
      },
    ],

    // Complaint status
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved", "Rejected"],
      default: "Pending",
    },

    // Community support
    upvotes: {
      type: Number,
      default: 0,
    },
    assignedDepartmentId: { type: String, default: "" },
    decisionReason: { type: String, default: "" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Problem", problemSchema);
