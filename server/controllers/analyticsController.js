import Lead from "../models/Lead.js";

// Dashboard Analytics
export const getDashboardAnalytics = async (req, res) => {
  try {

    // Total Leads
    const totalLeads = await Lead.countDocuments();

    // Closed Deals
    const closedDeals = await Lead.countDocuments({
      status: "Closed Won",
    });

    // Qualified Leads
    const qualifiedLeads = await Lead.countDocuments({
      status: "Qualified",
    });

    // Revenue
    const revenueData = await Lead.find({
      status: "Closed Won",
    });

    const totalRevenue = revenueData.reduce(
      (acc, lead) => acc + lead.expectedRevenue,
      0
    );

    res.status(200).json({
      totalLeads,
      closedDeals,
      qualifiedLeads,
      totalRevenue,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};