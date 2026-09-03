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
import partnerRoutes from "../modules/partner/index.js";

const router = Router();

/* -------------------------------------------------------------------------- */
/* Module Routes                                                               */
/* -------------------------------------------------------------------------- */

router.use("/citizens", citizenRoutes);
router.use("/citizen", citizenRoutes);

router.use("/government", governmentRoutes);
router.use("/governments", governmentRoutes);

router.use("/department", departmentRoutes);
router.use("/departments", departmentRoutes);

router.use("/university", universityRoutes);
router.use("/universities", universityRoutes);

router.use("/partner", partnerRoutes);
router.use("/partners", partnerRoutes);

export default router;