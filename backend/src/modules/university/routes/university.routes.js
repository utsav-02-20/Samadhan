import { Router } from "express";
import {
  getUniversities,
  submitProposal,
  getUniversityProfile,
  updateUniversityProfile,
  getUniversityProjects,
  getUniversityChallenges,
  triggerAIAllocation,
} from "../controllers/university.controller.js";

const router = Router();

router.get("/profile", getUniversityProfile);
router.put("/profile", updateUniversityProfile);
router.get("/projects", getUniversityProjects);
router.get("/challenges", getUniversityChallenges);
router.get("/", getUniversities);
router.post("/submissions", submitProposal);
router.post("/ai-assign", triggerAIAllocation);

export default router;
