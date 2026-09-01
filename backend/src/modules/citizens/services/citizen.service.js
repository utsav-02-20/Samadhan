/**
 * ============================================================================
 * File: citizen.service.js
 * Module: Citizens
 * ============================================================================
 *
 * Purpose:
 * Implements business logic for the Citizen module.
 *
 * Functionality:
 * - Registers and fetches citizens.
 * - Creates complaints linked to a citizen.
 * - Uploads complaint images to Cloudinary.
 * - Returns public complaint feed.
 * - Returns complaint history of a citizen.
 * - Handles community upvotes.
 *
 * Used By:
 * - citizen.controller.js
 * ============================================================================
 */

import Citizen from "../models/citizen.model.js";
import Problem from "../models/problem.model.js";
import cloudinary from "../../../config/cloudinary.js";

/* -------------------------------------------------------------------------- */
/* Register Citizen                                                            */
/* -------------------------------------------------------------------------- */
export const registerCitizen = async (data) => {
  const existingCitizen = await Citizen.findOne({ clerkId: data.clerkId });

  if (existingCitizen) return existingCitizen;

  return await Citizen.create(data);
};

/* -------------------------------------------------------------------------- */
/* Get Citizen by Clerk ID                                                     */
/* -------------------------------------------------------------------------- */
export const getCitizenByClerkId = async (clerkId) => {
  return await Citizen.findOne({ clerkId });
};

/* -------------------------------------------------------------------------- */
/* Upload Images to Cloudinary                                                 */
/* -------------------------------------------------------------------------- */
export const uploadImages = async (files = []) => {
  if (!files.length) return [];

  const imageUrls = [];

  for (const file of files) {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "samadhan/problems",
    });

    imageUrls.push(result.secure_url);
  }

  return imageUrls;
};

/* -------------------------------------------------------------------------- */
/* Create Complaint                                                            */
/* -------------------------------------------------------------------------- */
export const createComplaint = async (
  citizenId,
  complaintData,
  files = []
) => {
  const images = await uploadImages(files);

  return await Problem.create({
    citizenId,
    ...complaintData,
    images,
  });
};

/* -------------------------------------------------------------------------- */
/* Public Complaint Feed                                                       */
/* -------------------------------------------------------------------------- */
export const getPublicFeed = async (filters = {}) => {
  const query = {};

  if (filters.district) query.district = filters.district;
  if (filters.category) query.category = filters.category;
  if (filters.status) query.status = filters.status;

  return await Problem.find(query)
    .populate("citizenId", "fullName district")
    .sort({ createdAt: -1 });
};

/* -------------------------------------------------------------------------- */
/* Citizen Complaint History                                                   */
/* -------------------------------------------------------------------------- */
export const getCitizenHistory = async (citizenId) => {
  return await Problem.find({ citizenId }).sort({ createdAt: -1 });
};

/* -------------------------------------------------------------------------- */
/* Upvote Complaint                                                            */
/* -------------------------------------------------------------------------- */
export const upvoteComplaint = async (problemId) => {
  return await Problem.findByIdAndUpdate(
    problemId,
    { $inc: { upvotes: 1 } },
    { new: true }
  );
};