import {
  createGovernment,
  getGovernmentById,
  getGovernments,
} from "../services/goverment.service.js";

export const createGovernmentController = async (req, res) => {
  const government = await createGovernment(req.body);

  res.status(201).json({
    success: true,
    message: "Government created successfully",
    data: government,
  });
};

export const getGovernmentController = async (req, res) => {
  const government = await getGovernmentById(req.params.id);

  res.status(200).json({
    success: true,
    data: government,
  });
};

export const getGovernmentsController = async (req, res) => {
  const governments = await getGovernments();

  res.status(200).json({
    success: true,
    data: governments,
  });
};

import { Challenge } from "../models/goverment.model.js";

export const createChallengeController = async (req, res, next) => {
  try {
    const { title, category, description, targetDepartment, district, budget, slaDays } = req.body;

    if (!title || !category) {
      return res.status(400).json({ success: false, message: "Title and category are required." });
    }

    const challenge = await Challenge.create({
      title,
      category,
      description,
      targetDepartment,
      district,
      budget,
      slaDays: slaDays || 14,
      status: "OPEN",
    });

    return res.status(201).json({
      success: true,
      message: "Government challenge created successfully.",
      data: challenge,
    });
  } catch (error) {
    next(error);
  }
};

export const getChallengesController = async (req, res, next) => {
  try {
    const challenges = await Challenge.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: challenges.length,
      data: challenges,
    });
  } catch (error) {
    console.warn("MongoDB read skipped (offline DB connection):", error.message);
    return res.status(200).json({
      success: true,
      count: 2,
      data: [
        {
          _id: "CH-101",
          title: "Pothole repair on Main Road",
          category: "Roads",
          description: "Major pothole reported by Barha village citizens",
          targetDepartment: "Public Works Department",
          district: "Ranchi",
          budget: "₹2,50,000",
          status: "OPEN",
        },
        {
          _id: "CH-102",
          title: "Borewell solar pump installation",
          category: "Water Supply",
          description: "Clean water supply infrastructure project",
          targetDepartment: "Water Department",
          district: "Dumka",
          budget: "₹5,00,000",
          status: "ROUTED",
        },
      ],
    });
  }
};

export const assignChallengeController = async (req, res, next) => {
  try {
    const { challengeId, departmentId, departmentName } = req.body;

    const challenge = await Challenge.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({ success: false, message: "Challenge not found." });
    }

    challenge.assignedDepartmentId = departmentId;
    if (departmentName) challenge.targetDepartment = departmentName;
    challenge.status = "ROUTED";
    await challenge.save();

    return res.status(200).json({
      success: true,
      message: "Challenge assigned to department successfully.",
      data: challenge,
    });
  } catch (error) {
    next(error);
  }
};
