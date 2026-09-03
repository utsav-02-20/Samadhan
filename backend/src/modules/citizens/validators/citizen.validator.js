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
  title: z.string().min(3).max(120),

  description: z.string().min(5).max(1000),

  category: z.string().min(2),

  district: z.string().optional().default("General"),

  locality: z.string().optional().default("General Locality"),

  location: z
    .object({
      latitude: z.union([z.number(), z.string()]).transform(val => Number(val) || 0),
      longitude: z.union([z.number(), z.string()]).transform(val => Number(val) || 0),
    })
    .optional()
    .default({ latitude: 0, longitude: 0 }),

  images: z.array(z.string()).optional(),
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