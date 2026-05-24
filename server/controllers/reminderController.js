import Lead from "../models/Lead.js";

// ======================================
// Get All Active Follow Ups
// ======================================

export const getTodayReminders =
  async (req, res) => {

    try {

      const reminders =
        await Lead.find({

          followUpDate: {
            $ne: null,
          },

          followUpCompleted: false,

        }).sort({
          followUpDate: 1,
        });

      res.status(200).json(
        reminders
      );

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  };

// ======================================
// Mark Reminder Complete
// ======================================

export const completeReminder =
  async (req, res) => {

    try {

      const lead =
        await Lead.findById(
          req.params.id
        );

      if (!lead) {

        return res.status(404).json({
          message: "Lead not found",
        });

      }

      // Mark completed

      lead.followUpCompleted =
        true;

      // Add activity log

      lead.activities.push({

        message:
          "Follow-up marked as completed",

        createdAt: new Date(),

      });

      await lead.save();

      res.status(200).json({
        message:
          "Reminder completed successfully",
      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  };