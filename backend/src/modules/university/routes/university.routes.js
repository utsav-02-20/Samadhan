import { Router } from "express";
import {
  getUniversities,
  submitProposal,
  getProposals,
  getUniversityProfile,
  updateUniversityProfile,
  getUniversityProjects,
  getUniversityChallenges,
  triggerAIAllocation,
  getTeamMembers,
  addTeamMember,
  uploadMedia,
  uploadProjectFile,
  deleteProjectFile,
  registerTeam,
  getTeams,
  getTeamById,
} from "../controllers/university.controller.js";

const router = Router();

router.get("/profile", getUniversityProfile);
router.put("/profile", updateUniversityProfile);
router.get("/projects", getUniversityProjects);
router.get("/challenges", getUniversityChallenges);
router.get("/team", getTeamMembers);
router.post("/team", addTeamMember);
router.get("/proposals", getProposals);
router.get("/submissions", getProposals);
router.post("/submissions", submitProposal);
router.post("/upload", uploadMedia);
router.post("/upload-project-file", uploadProjectFile);
router.post("/delete-project-file", deleteProjectFile);
router.post("/ai-assign", triggerAIAllocation);
router.post("/teams", registerTeam);
router.get("/teams", getTeams);
router.get("/teams/:id", getTeamById);
router.get("/", getUniversities);

export default router;
