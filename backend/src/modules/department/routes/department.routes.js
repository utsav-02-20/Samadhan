import { Router } from "express";
import {
  createDepartment,
  getDepartments,
  getDepartmentById,
  assignChallengeToDepartment,
} from "../controllers/department.controller.js";

const router = Router();

router.post("/", createDepartment);
router.get("/", getDepartments);
router.get("/:id", getDepartmentById);
router.post("/assign", assignChallengeToDepartment);

export default router;
