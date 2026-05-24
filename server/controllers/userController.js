import User from "../models/User.js";

// Get all users

export const getUsers = async (req, res) => {

  try {

    const users = await User.find().select(
      "-password"
    );

    res.status(200).json(users);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
// ==========================
// Employee Analytics
// ==========================

import Lead from "../models/Lead.js";

export const getEmployeeAnalytics =
  async (req, res) => {

    try {

      const users = await User.find();

      const analytics =
        await Promise.all(

          users.map(async (user) => {

            const leads =
              await Lead.find({
                assignedTo: user._id,
              });

            const totalLeads =
              leads.length;

            const closedDeals =
              leads.filter(
                (lead) =>
                  lead.status ===
                  "Closed Won"
              ).length;

            const totalRevenue =
              leads.reduce(
                (sum, lead) =>
                  sum +
                  (lead.expectedRevenue || 0),
                0
              );

            return {
              _id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
              totalLeads,
              closedDeals,
              totalRevenue,
            };
          })
        );

      res.status(200).json(
        analytics
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: error.message,
      });
    }
  };