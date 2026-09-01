/**
 * ============================================================================
 * File: citizen.validator.js
 * Module: Citizens
 * ============================================================================
 *
 * Purpose:
 * Contains Zod schemas for validating incoming Citizen API requests.
 *
 * Functionality:
 * - Validates citizen registration data from Clerk.
 * - Validates problem submission requests.
 * - Validates district/category filter query parameters.
 * - Validates upvote requests.
 * - Prevents invalid data from reaching controllers.
 * ============================================================================
 */

import { z } from "zod";

/* -------------------------------------------------------------------------- */
/* Citizen Registration Validation                                             */
/* -------------------------------------------------------------------------- */

export const registerCitizenSchema = z.object({
  clerkId: z.string().min(1, "Clerk ID is required"),

  fullName: z.string().min(3, "Full name must be at least 3 characters"),

  email: z.string().email("Invalid email address"),

  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Invalid Indian phone number")
    .optional(),

  district: z.string().min(2, "District is required"),
});

/* -------------------------------------------------------------------------- */
/* Problem Submission Validation                                               */
/* -------------------------------------------------------------------------- */

export const problemSubmissionSchema = z.object({
  title: z.string().min(5).max(120),

  description: z.string().min(15).max(1000),

  category: z.enum([
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
  ]),

  district: z.string().min(2),

  locality: z.string().min(2),

  location: z.object({
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
  }),

  images: z.array(z.string().url()).optional(),
});

/* -------------------------------------------------------------------------- */
/* Complaint Filter Validation                                                 */
/* -------------------------------------------------------------------------- */

export const complaintFilterSchema = z.object({
  district: z.string().optional(),

  category: z
    .enum([
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
    ])
    .optional(),

  status: z
    .enum(["Pending", "In Progress", "Resolved", "Rejected"])
    .optional(),
});

/* -------------------------------------------------------------------------- */
/* Upvote Validation                                                           */
/* -------------------------------------------------------------------------- */

export const upvoteSchema = z.object({
  problemId: z.string().min(1, "Problem ID is required"),
});