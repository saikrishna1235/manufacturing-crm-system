import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
  Legend,
} from "recharts";

const Dashboard = () => {

  const [stats, setStats] =
    useState(null);

  // =========================
  // Fetch Dashboard Stats
  // =========================

  const fetchStats = async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await API.get(
          "/dashboard/stats",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setStats(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    fetchStats();

  }, []);

  // =========================
  // Loading State
  // =========================

  if (!stats) {

    return (

      <div className="flex items-center justify-center h-[80vh]">

        <div className="text-2xl font-bold">

          Loading Dashboard...

        </div>

      </div>

    );
  }

  // =========================
  // Colors
  // =========================

  const COLORS = [
    "#2563eb",
    "#16a34a",
    "#f59e0b",
    "#dc2626",
    "#7c3aed",
    "#0891b2",
    "#ea580c",
  ];

  // =========================
  // Revenue Trend
  // =========================

  const revenueTrend = [

    {
      month: "Jan",
      revenue: 40000,
    },

    {
      month: "Feb",
      revenue: 65000,
    },

    {
      month: "Mar",
      revenue: 50000,
    },

    {
      month: "Apr",
      revenue:
        stats.revenue,
    },

  ];

  return (

    <div className="space-y-10">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between">

        <div>

          <h1 className="text-4xl font-bold text-gray-800">

            Analytics Dashboard

          </h1>

          <p className="text-gray-500 mt-2">

            Manufacturing CRM Performance Overview

          </p>

        </div>

        <div className="mt-4 md:mt-0 bg-blue-600 text-white px-6 py-3 rounded-2xl shadow-lg">

          <p className="text-sm">

            Active CRM System

          </p>

          <h2 className="text-xl font-bold">

            Live Analytics

          </h2>

        </div>

      </div>

      {/* KPI CARDS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* Total Leads */}

        <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-6 rounded-3xl shadow-xl">

          <p className="text-sm opacity-80">

            Total Leads

          </p>

          <h2 className="text-5xl font-bold mt-3">

            {stats.totalLeads}

          </h2>

        </div>

        {/* Qualified */}

        <div className="bg-gradient-to-r from-green-600 to-green-500 text-white p-6 rounded-3xl shadow-xl">

          <p className="text-sm opacity-80">

            Qualified Leads

          </p>

          <h2 className="text-5xl font-bold mt-3">

            {stats.qualifiedLeads}

          </h2>

        </div>

        {/* Closed Deals */}

        <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white p-6 rounded-3xl shadow-xl">

          <p className="text-sm opacity-80">

            Closed Deals

          </p>

          <h2 className="text-5xl font-bold mt-3">

            {stats.closedDeals}

          </h2>

        </div>

        {/* Revenue */}

        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-3xl shadow-xl">

          <p className="text-sm opacity-80">

            Revenue

          </p>

          <h2 className="text-4xl font-bold mt-3">

            ₹{stats.revenue}

          </h2>

        </div>

      </div>

      {/* CHARTS */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        {/* Pie Chart */}

        <div className="bg-white rounded-3xl shadow-xl p-8">

          <div className="mb-6">

            <h2 className="text-2xl font-bold">

              Leads By Status

            </h2>

            <p className="text-gray-500 mt-1">

              Current pipeline distribution

            </p>

          </div>

          <ResponsiveContainer
            width="100%"
            height={350}
          >

            <PieChart>

              <Pie
                data={
                  stats.leadsByStatus
                }
                dataKey="value"
                nameKey="_id"
                outerRadius={120}
                innerRadius={70}
                paddingAngle={5}
                label
              >

                {stats.leadsByStatus.map(
                  (
                    entry,
                    index
                  ) => (

                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index %
                            COLORS.length
                        ]
                      }
                    />

                  )
                )}

              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>

        {/* Pipeline Chart */}

        <div className="bg-white rounded-3xl shadow-xl p-8">

          <div className="mb-6">

            <h2 className="text-2xl font-bold">

              Pipeline Overview

            </h2>

            <p className="text-gray-500 mt-1">

              Lead conversion analytics

            </p>

          </div>

          <ResponsiveContainer
            width="100%"
            height={350}
          >

            <BarChart
              data={
                stats.leadsByStatus
              }
            >

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis dataKey="_id" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="value"
                fill="#2563eb"
                radius={[10, 10, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* Revenue Trend */}

      <div className="bg-white rounded-3xl shadow-xl p-8">

        <div className="mb-6">

          <h2 className="text-2xl font-bold">

            Revenue Growth

          </h2>

          <p className="text-gray-500 mt-1">

            Monthly business revenue trend

          </p>

        </div>

        <ResponsiveContainer
          width="100%"
          height={400}
        >

          <AreaChart
            data={revenueTrend}
          >

            <defs>

              <linearGradient
                id="colorRevenue"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="5%"
                  stopColor="#2563eb"
                  stopOpacity={0.8}
                />

                <stop
                  offset="95%"
                  stopColor="#2563eb"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#2563eb"
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default Dashboard;