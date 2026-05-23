import { useEffect, useState } from "react";
import API from "../services/api";
import AnalyticsChart from "../components/AnalyticsChart";
const Dashboard = () => {

  const [analytics, setAnalytics] = useState({
    totalLeads: 0,
    qualifiedLeads: 0,
    closedDeals: 0,
    totalRevenue: 0,
  });

  // Fetch Analytics
  const fetchAnalytics = async () => {
    try {

      const token = localStorage.getItem("token");

      const response = await API.get(
        "/analytics/summary",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAnalytics(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <div>

      {/* Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome to Manufacturing CRM System
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Total Leads */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-gray-500 text-sm">
            Total Leads
          </h2>

          <p className="text-3xl font-bold mt-2">
            {analytics.totalLeads}
          </p>
        </div>

        {/* Qualified Leads */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-gray-500 text-sm">
            Qualified Leads
          </h2>

          <p className="text-3xl font-bold mt-2 text-green-600">
            {analytics.qualifiedLeads}
          </p>
        </div>

        {/* Closed Deals */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-gray-500 text-sm">
            Closed Deals
          </h2>

          <p className="text-3xl font-bold mt-2 text-blue-600">
            {analytics.closedDeals}
          </p>
        </div>

        {/* Revenue */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-gray-500 text-sm">
            Revenue
          </h2>

          <p className="text-3xl font-bold mt-2 text-purple-600">
            ₹{analytics.totalRevenue}
          </p>
        </div>

      </div>
        {/* Charts */}
        <div className="mt-10">
        <AnalyticsChart analytics={analytics} />
        </div>
    </div>
  );
};

export default Dashboard;