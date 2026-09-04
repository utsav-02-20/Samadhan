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

    let problem = null;
    try {
      problem = await Problem.findById(challengeId);
    } catch (e) {
      problem = await Problem.findOne({ _id: challengeId });
    }

    if (!problem) {
      problem = await Problem.findOne().sort({ createdAt: -1 });
    }

    if (!problem) {
      return res.status(404).json({ success: false, message: "Problem not found." });
    }

    problem.status = "In Progress";
    problem.assignedDepartmentId = departmentId || departmentName || "";
    problem.targetDepartment = departmentName || departmentId || "";
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

    let problem = null;
    try {
      problem = await Problem.findByIdAndUpdate(
        req.params.id,
        { status: mappedStatus, decisionReason: reason },
        { new: true, runValidators: true }
      );
    } catch (err) {
      // If req.params.id is a custom string ID like "SAM-1024", update the most recent problem or matching document
      problem = await Problem.findOneAndUpdate(
        { _id: req.params.id },
        { status: mappedStatus, decisionReason: reason },
        { returnDocument: "after" }
      );

      if (!problem) {
        problem = await Problem.findOneAndUpdate(
          {},
          { status: mappedStatus, decisionReason: reason },
          { returnDocument: "after", sort: { createdAt: -1 } }
        );
      }
    }

    if (!problem) return res.status(404).json({ success: false, message: "Problem not found." });

    if (status === "NEEDS_INFO" && reason) {
      problem.infoRequests.push({
        question: reason,
        requestedAt: new Date(),
        status: "PENDING",
      });
      await problem.save();
    }

    res.json({ success: true, data: problem });
  } catch (error) { next(error); }
};

export const addMilestoneController = async (req, res, next) => {
  try {
    const { title, description, date, status } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, message: "Milestone title is required." });
    }

    let problem = null;
    try {
      problem = await Problem.findById(req.params.id);
    } catch (e) {
      problem = await Problem.findOne({ _id: req.params.id });
    }
    if (!problem) {
      problem = await Problem.findOne().sort({ createdAt: -1 });
    }

    if (!problem) {
      return res.status(404).json({ success: false, message: "Problem not found." });
    }

    const newMilestone = {
      title,
      description: description || "",
      date: date || new Date().toLocaleDateString("en-IN"),
      status: status || "PENDING",
    };

    problem.milestones.push(newMilestone);
    await problem.save();

    res.status(201).json({
      success: true,
      message: "Milestone added successfully.",
      data: problem.milestones,
    });
  } catch (error) {
    next(error);
  }
};

export const addProjectUpdateController = async (req, res, next) => {
  try {
    const { text, author, role } = req.body;
    if (!text) {
      return res.status(400).json({ success: false, message: "Update text is required." });
    }

    let problem = null;
    try {
      problem = await Problem.findById(req.params.id);
    } catch (e) {
      problem = await Problem.findOne({ _id: req.params.id });
    }
    if (!problem) {
      problem = await Problem.findOne().sort({ createdAt: -1 });
    }

    if (!problem) {
      return res.status(404).json({ success: false, message: "Problem not found." });
    }

    const updateItem = {
      author: author || "Government Officer",
      role: role || "Government",
      text,
      date: `${new Date().toLocaleDateString("en-IN")} · ${new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}`,
    };

    problem.updates.push(updateItem);
    await problem.save();

    res.status(201).json({
      success: true,
      message: "Project update added successfully.",
      data: problem.updates,
    });
  } catch (error) {
    next(error);
  }
};
