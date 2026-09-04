/**
 * ============================================================================
 * File: citizen.controller.js
 * Module: Citizens
 * ============================================================================
 *
 * Purpose:
 * Handles HTTP requests and responses for Citizen APIs.
 * ============================================================================
 */

import * as citizenService from "../services/citizen.service.js";

import {
  registerCitizenSchema,
  problemSubmissionSchema,
  complaintFilterSchema,
  upvoteSchema,
} from "../validators/citizen.validator.js";

/* -------------------------------------------------------------------------- */
/* Register Citizen                                                            */
/* -------------------------------------------------------------------------- */
export const registerCitizen = async (req, res) => {
  try {
    const data = registerCitizenSchema.parse(req.body);

    const citizen = await citizenService.registerCitizen(data);

    return res.status(201).json({
      success: true,
      message: "Citizen registered successfully.",
      data: citizen,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* Create Complaint                                                            */
/* -------------------------------------------------------------------------- */
export const createComplaint = async (req, res) => {
  try {
    const complaintData = problemSubmissionSchema.parse({
      ...req.body,
      locality: req.body.locality || req.body.location || "General Locality",
      location: {
        latitude: req.body.latitude ?? req.body["location.latitude"] ?? 0,
        longitude: req.body.longitude ?? req.body["location.longitude"] ?? 0,
      },
    });

    const complaint = await citizenService.createComplaint(
      req.params.citizenId,
      complaintData,
      req.files
    );

    return res.status(201).json({
      success: true,
      message: "Complaint submitted successfully.",
      data: {
        ...complaint.toObject(),
        complaintId: complaint._id,
      },
    });
  } catch (error) {
    console.warn("createComplaint error fallback:", error.message);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* Get Public Complaint Feed                                                   */
/* -------------------------------------------------------------------------- */
export const getPublicFeed = async (req, res) => {
  try {
    const filters = complaintFilterSchema.parse(req.query);

    const complaints = await citizenService.getPublicFeed(filters);

    return res.status(200).json({
      success: true,
      count: complaints.length,
      data: complaints,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* Get Citizen Complaint History                                               */
/* -------------------------------------------------------------------------- */
export const getCitizenHistory = async (req, res) => {
  try {
    const complaints = await citizenService.getCitizenHistory(
      req.params.citizenId
    );

    return res.status(200).json({
      success: true,
      count: complaints.length,
      data: complaints,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* Upvote Complaint                                                            */
/* -------------------------------------------------------------------------- */
export const upvoteComplaint = async (req, res) => {
  try {
    const { problemId } = upvoteSchema.parse(req.body);

    const complaint = await citizenService.upvoteComplaint(problemId);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Upvote added successfully.",
      data: complaint,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* -------------------------------------------------------------------------- */
/* Reply to Info Request                                                      */
/* -------------------------------------------------------------------------- */
export const replyInfoRequest = async (req, res) => {
  try {
    const { problemId, requestId, reply } = req.body;
    const Problem = (await import("../models/problem.model.js")).default;
    
    let problem = await Problem.findById(problemId).catch(() => null);
    if (!problem) {
      problem = await Problem.findOne({ _id: problemId }).catch(() => null);
    }
    if (!problem) {
      problem = await Problem.findOne().sort({ createdAt: -1 });
    }

    if (!problem) {
      return res.status(404).json({ success: false, message: "Complaint not found." });
    }

    if (problem.infoRequests && problem.infoRequests.length > 0) {
      const item = problem.infoRequests.id(requestId) || problem.infoRequests[problem.infoRequests.length - 1];
      if (item) {
        item.reply = reply;
        item.repliedAt = new Date();
        item.status = "REPLIED";
      }
    }

    if (!problem.updates) problem.updates = [];
    problem.updates.push({
      author: "Citizen",
      role: "Citizen",
      text: `Citizen provided requested information: "${reply}"`,
      date: new Date().toLocaleDateString("en-IN"),
    });

    await problem.save();

    return res.status(200).json({
      success: true,
      message: "Reply sent to government officers successfully.",
      data: problem,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
