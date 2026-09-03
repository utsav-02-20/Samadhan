import { Router } from "express";
import {
  createDepartment,
  getDepartments,
  getDepartmentById,
  assignChallengeToDepartment,
  getAcceptedProjects,
  saveAcceptedProject,
  getDepartmentProfile,
  updateDepartmentProfile,
  getDepartmentChallenges,
} from "../controllers/department.controller.js";

const router = Router();

router.get("/profile", getDepartmentProfile);
router.put("/profile", updateDepartmentProfile);
router.get("/accepted-projects", getAcceptedProjects);
router.get("/challenges", getDepartmentChallenges);
router.post("/accepted-projects", saveAcceptedProject);
router.post("/", createDepartment);
router.get("/", getDepartments);
router.post("/assign", assignChallengeToDepartment);
router.get("/:id", getDepartmentById);

export default router;
