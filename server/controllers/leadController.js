import Lead from "../models/Lead.js";
import sendEmail from "../utils/sendEmail.js";
// ===============================
// Create Lead
// ===============================

export const createLead = async (
  req,
  res
) => {

  try {

    const lead = await Lead.create({
      
      ...req.body,

      assignedTo: req.user._id,

      activities: [
        {
          message: "Lead created",
          createdAt: new Date(),
        },
      ],
      
    });
    await sendEmail(

  req.user.email,

  "New Lead Created",

  `Lead ${lead.name} has been created successfully.`

);
    // =========================
    // Realtime Notification
    // =========================

    global.io.emit(
      "leadCreated",
      {
        message:
          "New lead created",
        lead,
      }
    );

    res.status(201).json(lead);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};

// ===============================
// Get All Leads
// ===============================

export const getLeads = async (
  req,
  res
) => {

  try {

    let leads;

    // =========================
    // Admin → All Leads
    // =========================

    if (
      req.user.role === "admin"
    ) {

      leads = await Lead.find()
        .populate(
          "assignedTo",
          "name email"
        );

    } else {

      // =========================
      // Employee → Assigned Leads
      // =========================

      leads = await Lead.find({
        assignedTo: req.user._id,
      }).populate(
        "assignedTo",
        "name email"
      );
    }

    res.status(200).json(leads);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};

// ===============================
// Get Single Lead
// ===============================

export const getLeadById = async (
  req,
  res
) => {

  try {

    const lead = await Lead.findById(
      req.params.id
    ).populate(
      "assignedTo",
      "name email"
    );

    if (!lead) {

      return res.status(404).json({
        message: "Lead not found",
      });

    }

    res.status(200).json(lead);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};

// ===============================
// Update Lead
// ===============================

export const updateLead = async (
  req,
  res
) => {

  try {

    const lead = await Lead.findById(
      req.params.id
    );

    if (!lead) {

      return res.status(404).json({
        message: "Lead not found",
      });

    }

    // =========================
    // Track Status Change
    // =========================

    if (
      req.body.status &&
      req.body.status !== lead.status
    ) {

      lead.activities.push({

        message:
          `Status changed from ${lead.status} to ${req.body.status}`,

        createdAt: new Date(),

      });
    }

    // =========================
    // Update Fields
    // =========================

    lead.name =
      req.body.name || lead.name;

    lead.company =
      req.body.company || lead.company;

    lead.email =
      req.body.email || lead.email;

    lead.phone =
      req.body.phone || lead.phone;

    lead.industry =
      req.body.industry || lead.industry;

    lead.source =
      req.body.source || lead.source;

    lead.status =
      req.body.status || lead.status;

    lead.notes =
      req.body.notes || lead.notes;

    lead.expectedRevenue =
      req.body.expectedRevenue ||
      lead.expectedRevenue;

    lead.followUpDate =
      req.body.followUpDate ||
      lead.followUpDate;

    lead.assignedTo =
      req.body.assignedTo ||
      lead.assignedTo;

    // =========================
    // Save
    // =========================

    await lead.save();
    await sendEmail(

    req.user.email,

    "Lead Status Updated",

    `Lead ${lead.name} moved to ${lead.status}`

  );
    // =========================
    // Realtime Notification
    // =========================

    global.io.emit(
      "leadUpdated",
      {
        message:
          `Lead moved to ${lead.status}`,
        lead,
      }
    );

    res.status(200).json(lead);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};

// ===============================
// Delete Lead
// ===============================

export const deleteLead = async (
  req,
  res
) => {

  try {

    const lead = await Lead.findById(
      req.params.id
    );

    if (!lead) {

      return res.status(404).json({
        message: "Lead not found",
      });

    }

    await lead.deleteOne();

    // =========================
    // Realtime Notification
    // =========================

    global.io.emit(
      "leadDeleted",
      {
        message:
          "Lead deleted",
      }
    );

    res.status(200).json({
      message:
        "Lead deleted successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};