import Lead from "../models/Lead.js";

export const getDashboardStats =
  async (req, res) => {

    try {

      const totalLeads =
        await Lead.countDocuments();

      const qualifiedLeads =
        await Lead.countDocuments({
          status: "Qualified",
        });

      const closedDeals =
        await Lead.countDocuments({
          status: "Closed Won",
        });

      const totalRevenue =
        await Lead.aggregate([
          {
            $match: {
              status: "Closed Won",
            },
          },
          {
            $group: {
              _id: null,
              total: {
                $sum:
                  "$expectedRevenue",
              },
            },
          },
        ]);

      const leadsByStatus =
        await Lead.aggregate([
          {
            $group: {
              _id: "$status",
              value: {
                $sum: 1,
              },
            },
          },
        ]);

      res.json({

        totalLeads,

        qualifiedLeads,

        closedDeals,

        revenue:
          totalRevenue[0]?.total || 0,

        leadsByStatus,

      });

    } catch (error) {

      res.status(500).json({
        message: error.message,
      });

    }
  };