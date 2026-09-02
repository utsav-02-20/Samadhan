import { Router } from "express";
import { getUniversities, submitProposal } from "../controllers/university.controller.js";

const router = Router();

router.get("/", getUniversities);
router.post("/submissions", submitProposal);

export default router;
