/**
 * ============================================================================
 * File: index.js
 * Module: Routes
 * ============================================================================
 *
 * Purpose:
 * Central router for the Samadhan backend application.
 *
 * Functionality:
 * - Combines routes from all backend modules.
 * - Mounts Citizens, Government, Department, and University APIs.
 * - Exports a single router mounted under `/api/v1`.
 * ============================================================================
 */

import { Router } from "express";

import citizenRoutes from "../modules/citizens/index.js";
import governmentRoutes from "../modules/government/index.js";
import departmentRoutes from "../modules/department/index.js";
import universityRoutes from "../modules/university/index.js";

const router = Router();

/* -------------------------------------------------------------------------- */
/* Module Routes                                                               */
/* -------------------------------------------------------------------------- */

router.use("/citizens", citizenRoutes);
router.use("/government", governmentRoutes);
router.use("/department", departmentRoutes);
router.use("/university", universityRoutes);

export default router;