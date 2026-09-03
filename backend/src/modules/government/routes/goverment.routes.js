import { Router } from "express";

import {
  createGovernmentController,
  getGovernmentController,
  getGovernmentsController,
  createChallengeController,
  getChallengesController,
  assignChallengeController,
  updateChallengeStatusController,
} from "../controllers/goverment.controller.js";

const router = Router();

router.post("/challenges", createChallengeController);
router.get("/challenges", getChallengesController);
router.post("/assign-challenge", assignChallengeController);
router.patch("/challenges/:id/status", updateChallengeStatusController);

router.post("/", createGovernmentController);
router.get("/", getGovernmentsController);
router.get("/:id", getGovernmentController);

export default router;
