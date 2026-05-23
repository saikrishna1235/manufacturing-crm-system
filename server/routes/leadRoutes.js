import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
} from "../controllers/leadController.js";

const router = express.Router();

// Get all leads + Create lead
router
  .route("/")
  .get(protect, getLeads)
  .post(protect, createLead);

// Single lead routes
router
  .route("/:id")
  .get(protect, getLeadById)
  .put(protect, updateLead)
  .delete(protect, deleteLead);

export default router;