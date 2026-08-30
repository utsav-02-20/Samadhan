import { Router } from "express";

import {
  createGovernmentController,
  getGovernmentController,
  getGovernmentsController,
} from "../controllers/goverment.controller.js";

const router = Router();

router.post("/", createGovernmentController);

router.get("/", getGovernmentsController);

router.get("/:id", getGovernmentController);

export default router;
