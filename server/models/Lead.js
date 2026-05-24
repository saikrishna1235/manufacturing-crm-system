import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    company: {
      type: String,
      required: true,
    },

    email: {
      type: String,
    },

    phone: {
      type: String,
    },

    industry: {
      type: String,
    },

    source: {
      type: String,
    },

    status: {
      type: String,
      enum: [
        "New",
        "Contacted",
        "Qualified",
        "Proposal Sent",
        "Negotiation",
        "Closed Won",
        "Closed Lost",
      ],
      default: "New",
    },
    priority: {
        type: String,
        enum: [
          "High",
          "Medium",
          "Low",
        ],
        default: "Medium",
      },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    notes: {
      type: String,
    },

    expectedRevenue: {
      type: Number,
      default: 0,
    },

    followUpDate: {
      type: Date,
    },
    followUpCompleted: {
      type: Boolean,
      default: false,
    },
    // =========================
    // Activities Timeline
    // =========================

    activities: [
      {
        message: {
          type: String,
        },

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },

  {
    timestamps: true,
  }
);

const Lead = mongoose.model(
  "Lead",
  leadSchema
);

export default Lead;