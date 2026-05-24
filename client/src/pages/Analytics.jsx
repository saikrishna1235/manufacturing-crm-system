import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

const Analytics = () => {

  const [analytics, setAnalytics] =
    useState([]);

  const fetchAnalytics =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await API.get(
            "/users/analytics",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setAnalytics(
          response.data
        );

      } catch (error) {

        console.log(error);

      }
    };

  useEffect(() => {

    fetchAnalytics();

  }, []);

  return (

    <div>

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Employee Analytics
        </h1>

        <p className="text-gray-500 mt-2">
          Team performance overview
        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {analytics.map((employee) => (

          <div
            key={employee._id}
            className="bg-white rounded-2xl shadow p-6"
          >

            <h2 className="text-2xl font-bold">

              {employee.name}

            </h2>

            <p className="text-gray-500 mt-1">

              {employee.email}

            </p>

            <div className="mt-6 space-y-3">

              <div className="flex justify-between">

                <span>Total Leads</span>

                <span className="font-bold">
                  {employee.totalLeads}
                </span>

              </div>

              <div className="flex justify-between">

                <span>Closed Deals</span>

                <span className="font-bold">
                  {employee.closedDeals}
                </span>

              </div>

              <div className="flex justify-between">

                <span>Revenue</span>

                <span className="font-bold text-green-600">

                  ₹
                  {employee.totalRevenue}

                </span>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Analytics;