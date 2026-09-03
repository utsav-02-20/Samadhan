import { Router } from "express";
import {
  getOpportunities,
  submitApplication,
  getCollaborations,
} from "../controllers/partner.controller.js";

const router = Router();

router.get("/opportunities", getOpportunities);
router.post("/applications", submitApplication);
router.get("/collaborations", getCollaborations);

export default router;
