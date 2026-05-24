import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  getTodayReminders,
  completeReminder,
} from "../controllers/reminderController.js";

const router = express.Router();

// Get reminders

router.get(
  "/today",
  protect,
  getTodayReminders
);

// Complete reminder

router.put(
  "/:id/complete",
  protect,
  completeReminder
);

export default router;