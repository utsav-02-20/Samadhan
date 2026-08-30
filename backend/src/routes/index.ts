import { Router } from "express";

import govermentRoutes from "../modules/goverment/index.js";

const router = Router();

router.use("/government", govermentRoutes);

export default router;