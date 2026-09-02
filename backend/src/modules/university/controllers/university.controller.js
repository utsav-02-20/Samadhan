import University from "../models/university.model.js";

export const getUniversities = async (req, res, next) => {
  try {
    const list = await University.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, count: list.length, data: list });
  } catch (error) {
    next(error);
  }
};

export const submitProposal = async (req, res, next) => {
  try {
    const { universityName, challengeId, projectTitle, proposalText, teamLead } = req.body;

    let uni = await University.findOne({ name: universityName || "IIIT Bhagalpur" });
    if (!uni) {
      uni = await University.create({
        name: universityName || "IIIT Bhagalpur",
        email: "contact@iiitbh.ac.in",
        code: "UNI-001",
      });
    }

    uni.proposals.push({
      challengeId: challengeId || "CH-101",
      projectTitle: projectTitle || "Civic AI Solution",
      proposalText: proposalText || "Solution proposal details",
      teamLead: teamLead || "Student Lead",
    });

    await uni.save();

    return res.status(201).json({
      success: true,
      message: "Proposal submitted successfully.",
      data: uni,
    });
  } catch (error) {
    next(error);
  }
};
