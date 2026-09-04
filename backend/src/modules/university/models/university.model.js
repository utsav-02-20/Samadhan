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
    phone: { type: String, trim: true, default: "+91 98765 43210" },
    location: { type: String, trim: true, default: "Ranchi, Jharkhand" },
    permanentAddress: { type: String, trim: true },
    isAutonomous: { type: Boolean, default: true },
    parentUniversity: { type: String, trim: true },
    degreesOffered: [{ type: String }],
    establishedYear: { type: Number },
    website: { type: String, trim: true, default: "https://bitmesra.ac.in" },
    coordinator: { type: String, trim: true, default: "Dr. A. K. Sharma (R&D Head)" },
    departments: [
      {
        name: { type: String, required: true },
        code: { type: String },
        head: { type: String },
      },
    ],
    teamMembers: [
      {
        name: { type: String, required: true },
        email: { type: String, required: true },
        role: { type: String, default: "Researcher" },
        project: { type: String, default: "Civic Research" },
        status: { type: String, default: "ACTIVE" },
      },
    ],
    proposals: [
      {
        challengeId: String,
        projectTitle: String,
        proposalText: String,
        teamLead: String,
        fileUrl: String,
        fileName: String,
        cloudinaryPublicId: String,
        status: { type: String, default: "UNDER REVIEW" },
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
        submissions: [
          {
            fileName: String,
            fileUrl: String,
            fileType: String,
            cloudinaryPublicId: String,
            uploadedAt: { type: Date, default: Date.now },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("University", universitySchema);
