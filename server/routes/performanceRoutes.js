import express from "express";

import {
  getPerformance,
} from "../controllers/performanceController.js";

import protect from "../middleware/authMiddleware.js";

const router =
  express.Router();

// =====================================
// Employee Performance Route
// =====================================

router.get(
  "/",
  protect,
  getPerformance
);

export default router;