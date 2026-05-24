import Lead from "../models/Lead.js";

// =====================================
// Employee Performance Analytics
// =====================================

export const getPerformance =
  async (req, res) => {

    try {

      // Logged in employee

      const userId =
        req.user._id;

      // Get only employee leads

      const leads =
        await Lead.find({
          assignedTo: userId,
        });

      // =========================
      // Metrics
      // =========================

      const totalLeads =
        leads.length;

      const closedDeals =
        leads.filter(
          (lead) =>
            lead.status ===
            "Closed Won"
        ).length;

      const revenue =
        leads
          .filter(
            (lead) =>
              lead.status ===
              "Closed Won"
          )
          .reduce(
            (acc, lead) =>
              acc +
              Number(
                lead.expectedRevenue || 0
              ),
            0
          );

      // =========================
      // Conversion Rate
      // =========================

      const conversionRate =
        totalLeads > 0
          ? (
              (closedDeals /
                totalLeads) *
              100
            ).toFixed(1)
          : 0;

      // =========================
      // Monthly Target
      // =========================

      const target = 1000000;

      const progress =
        (
          (revenue / target) *
          100
        ).toFixed(1);

      // =========================
      // Pending Followups
      // =========================

      const pendingFollowUps =
        leads.filter(
          (lead) =>
            lead.followUpDate &&
            !lead.followUpCompleted
        ).length;

      // =========================
      // Response
      // =========================

      res.status(200).json({

        totalLeads,

        closedDeals,

        revenue,

        conversionRate,

        target,

        progress,

        pendingFollowUps,

      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  };