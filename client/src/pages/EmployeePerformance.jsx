import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

const EmployeePerformance =
  () => {

    const [
      stats,
      setStats,
    ] = useState(null);

    // =========================
    // Fetch Performance
    // =========================

    const fetchPerformance =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "token"
            );

          const response =
            await API.get(
              "/performance",
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          setStats(
            response.data
          );

        } catch (error) {

          console.log(error);

        }
      };

    useEffect(() => {

      fetchPerformance();

    }, []);

    if (!stats) {

      return (
        <div className="text-2xl font-bold">
          Loading...
        </div>
      );
    }

    return (

      <div>

        {/* Header */}

        <div className="mb-8">

          <h1 className="text-4xl font-bold">

            My Performance

          </h1>

          <p className="text-gray-500 mt-2">

            Employee productivity overview

          </p>

        </div>

        {/* KPI Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

          {/* Total Leads */}

          <div className="bg-blue-600 text-white p-6 rounded-3xl shadow-xl">

            <p>Total Leads</p>

            <h2 className="text-5xl font-bold mt-3">

              {
                stats.totalLeads
              }

            </h2>

          </div>

          {/* Closed Deals */}

          <div className="bg-green-600 text-white p-6 rounded-3xl shadow-xl">

            <p>Closed Deals</p>

            <h2 className="text-5xl font-bold mt-3">

              {
                stats.closedDeals
              }

            </h2>

          </div>

          {/* Revenue */}

          <div className="bg-purple-600 text-white p-6 rounded-3xl shadow-xl">

            <p>Revenue</p>

            <h2 className="text-4xl font-bold mt-3">

              ₹{
                stats.revenue
              }

            </h2>

          </div>

          {/* Conversion Rate */}

          <div className="bg-orange-500 text-white p-6 rounded-3xl shadow-xl">

            <p>Conversion Rate</p>

            <h2 className="text-5xl font-bold mt-3">

              {
                stats.conversionRate
              }%

            </h2>

          </div>

        </div>

        {/* Target Progress */}

        <div className="bg-white p-8 rounded-3xl shadow-xl">

          <div className="flex justify-between mb-4">

            <h2 className="text-2xl font-bold">

              Monthly Target

            </h2>

            <p className="font-semibold">

              ₹{
                stats.revenue
              }

              /

              ₹{
                stats.target
              }

            </p>

          </div>

          {/* Progress Bar */}

          <div className="w-full bg-gray-200 h-6 rounded-full overflow-hidden">

            <div
              className="bg-green-500 h-6 rounded-full transition-all duration-500"
              style={{
                width: `${stats.progress}%`,
              }}
            />

          </div>

          <p className="mt-4 text-lg font-semibold text-green-600">

            {
              stats.progress
            }%

            Target Achieved

          </p>

        </div>

      </div>
    );
  };

export default EmployeePerformance;