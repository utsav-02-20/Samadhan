/**
 * File: index.ts
 *
 * Functionality:
 * Central router for the backend application.
 * Combines routes from all modules (Citizens, Government,
 * Department, University) and exports a single API router.
 */

import { Router } from "express";

import govermentRoutes from "../modules/goverment/index.js";

const router = Router();

router.use("/government", govermentRoutes);

export default router;