import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  getUsers,
  getEmployeeAnalytics,
} from "../controllers/userController.js";

const router = express.Router();

// Get All Users

router.get(
  "/",
  protect,
  getUsers
);

// Employee Analytics

router.get(
  "/analytics",
  protect,
  getEmployeeAnalytics
);

export default router;