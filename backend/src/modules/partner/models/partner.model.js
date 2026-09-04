import mongoose from "mongoose";

const partnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    organization: {
      type: String,
      default: "CSR / Industry Partner",
    },
    contactPhone: String,
    clerkId: String,
  },
  { timestamps: true }
);

export const Partner = mongoose.model("Partner", partnerSchema);

const opportunitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "CSR & Community Impact",
    },
    department: String,
    description: String,
    budget: String,
    deadline: String,
    location: String,
    status: {
      type: String,
      default: "OPEN",
    },
  },
  { timestamps: true }
);

export const PartnerOpportunity = mongoose.model("PartnerOpportunity", opportunitySchema);

const applicationSchema = new mongoose.Schema(
  {
    opportunityId: String,
    partnerName: String,
    partnerEmail: String,
    proposalTitle: String,
    proposedBudget: String,
    description: String,
    status: {
      type: String,
      default: "SUBMITTED",
    },
  },
  { timestamps: true }
);

export const PartnerApplication = mongoose.model("PartnerApplication", applicationSchema);
