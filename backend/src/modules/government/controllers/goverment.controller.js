import {
  createGovernment,
  getGovernmentById,
  getGovernments,
} from "../services/goverment.service.js";
import Problem from "../../citizens/models/problem.model.js";

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

export const createChallengeController = async (req, res, next) => {
  try {
    const { title, category, description, district, locality } = req.body;

    if (!title || !category) {
      return res.status(400).json({ success: false, message: "Title and category are required." });
    }

    const problem = await Problem.create({
      citizenId: "government-admin",
      title,
      category,
      description: description || "Government initiated challenge",
      district: district || "Ranchi",
      locality: locality || "General Locality",
      location: { latitude: 0, longitude: 0 },
      status: "Pending",
    });

    return res.status(201).json({
      success: true,
      message: "Government challenge created successfully.",
      data: problem,
    });
  } catch (error) {
    next(error);
  }
};

export const getChallengesController = async (req, res, next) => {
  try {
    const problems = await Problem.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: problems.length,
      data: problems,
    });
  } catch (error) {
    console.warn("MongoDB read skipped in getChallengesController (offline DB connection):", error.message);
    return res.status(200).json({
      success: true,
      count: 1,
      data: [
        {
          _id: "SAM-1001",
          title: "Bore well dry in Barha village",
          description: "Water supply disrupted for 3 days",
          category: "Water Supply",
          district: "Ranchi",
          status: "Pending",
          upvotes: 14,
          createdAt: new Date(),
        },
      ],
    });
  }
};

export const assignChallengeController = async (req, res, next) => {
  try {
    const { challengeId, departmentId, departmentName } = req.body;

    const problem = await Problem.findById(challengeId);
    if (!problem) {
      return res.status(404).json({ success: false, message: "Problem not found." });
    }

    problem.status = "In Progress";
    problem.assignedDepartmentId = departmentId || departmentName || "";
    await problem.save();

    return res.status(200).json({
      success: true,
      message: "Problem assigned to department successfully.",
      data: problem,
    });
  } catch (error) {
    next(error);
  }
};

export const updateChallengeStatusController = async (req, res, next) => {
  try {
    const { status, reason = "" } = req.body;
    
    // Map status string to Problem model status enum
    let mappedStatus = status;
    if (status === "ACCEPTED" || status === "ROUTED" || status === "IN_PROGRESS") mappedStatus = "In Progress";
    if (status === "REJECTED") mappedStatus = "Rejected";
    if (status === "RESOLVED") mappedStatus = "Resolved";

    const problem = await Problem.findByIdAndUpdate(
      req.params.id,
      { status: mappedStatus, decisionReason: reason },
      { new: true, runValidators: true }
    );

    if (!problem) return res.status(404).json({ success: false, message: "Problem not found." });
    res.json({ success: true, data: problem });
  } catch (error) { next(error); }
};
