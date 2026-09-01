/**
 * ============================================================================
 * File: citizen.routes.js
 * Module: Citizens
 * ============================================================================
 *
 * Purpose:
 * Defines Express routes for all Citizen APIs.
 *
 * Functionality:
 * - Registers authenticated citizens.
 * - Creates new complaints.
 * - Returns public complaint feed.
 * - Returns complaint history of a citizen.
 * - Allows community upvotes on complaints.
 *
 * Mounted At:
 * /api/v1/citizens
 * ============================================================================
 */

import { Router } from "express";
import multer from "multer";

import authMiddleware from "../../../middlewares/auth.middleware.js";
import validate from "../../../middlewares/validate.middleware.js";

import {
  registerCitizen,
  createComplaint,
  getPublicFeed,
  getCitizenHistory,
  upvoteComplaint,
} from "../controllers/citizen.controller.js";

import {
  registerCitizenSchema,
  problemSubmissionSchema,
  upvoteSchema,
} from "../validators/citizen.validator.js";

const router = Router();

// Multer configuration (temporary local storage)
const upload = multer({ dest: "uploads/" });

/* -------------------------------------------------------------------------- */
/* Citizen APIs                                                                */
/* -------------------------------------------------------------------------- */

// Register citizen after Clerk authentication
router.post("/register", authMiddleware, registerCitizen);

// Submit a new complaint (supports multiple image uploads)
router.post(
  "/:citizenId/complaints",
  authMiddleware,
  upload.array("images", 5), // Max 5 images
  createComplaint
);

// Public complaint feed
router.get("/feed", getPublicFeed);

// Logged-in citizen complaint history
router.get("/:citizenId/history", authMiddleware, getCitizenHistory);

// Community upvote a complaint
router.patch("/upvote", authMiddleware, upvoteComplaint);

export default router;