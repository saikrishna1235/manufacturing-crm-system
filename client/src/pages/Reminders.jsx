import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

const Reminders = () => {

  const [leads, setLeads] =
    useState([]);

  // =========================
  // Fetch Leads
  // =========================

  const fetchLeads = async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await API.get(
          "/leads",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      // Only leads having follow-up
      // and not completed

      const filtered =
        response.data.filter(
          (lead) =>
            lead.followUpDate &&
            !lead.followUpCompleted
        );

      setLeads(filtered);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    fetchLeads();

  }, []);

  // =========================
  // Reminder Status
  // =========================

  const getStatus = (date) => {

    const today =
      new Date();

    const followDate =
      new Date(date);

    if (
      followDate < today
    ) {

      return "Overdue";
    }

    return "Upcoming";
  };

  // =========================
  // Complete Reminder
  // =========================

  const completeReminder =
    async (id) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await API.put(
          `/reminders/${id}/complete`,
          {},
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        // Refresh

        fetchLeads();

      } catch (error) {

        console.log(error);

      }
    };

  return (

    <div>

      {/* Title */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold">

          Follow-Up Reminders

        </h1>

        <p className="text-gray-500 mt-2">

          Track upcoming client follow-ups

        </p>

      </div>

      {/* Empty State */}

      {leads.length === 0 && (

        <div className="bg-white p-10 rounded-2xl shadow text-center">

          <h2 className="text-2xl font-bold">

            No Follow-Ups Today

          </h2>

          <p className="text-gray-500 mt-2">

            You're all caught up 🎉

          </p>

        </div>

      )}

      {/* Reminder Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {leads.map((lead) => (

          <div
            key={lead._id}
            className="bg-white rounded-2xl shadow p-6"
          >

            {/* Name */}

            <h2 className="text-2xl font-bold">

              {lead.name}

            </h2>

            {/* Company */}

            <p className="text-gray-500 mt-1">

              {lead.company}

            </p>

            {/* Follow Up */}

            <div className="mt-4">

              <p className="text-sm text-gray-500">

                Follow-up Date

              </p>

              <p className="font-semibold">

                {new Date(
                  lead.followUpDate
                ).toLocaleString()}

              </p>

            </div>

            {/* Status */}

            <div className="mt-4">

              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  getStatus(
                    lead.followUpDate
                  ) === "Overdue"
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                }`}
              >

                {getStatus(
                  lead.followUpDate
                )}

              </span>

            </div>

            {/* Complete Button */}

            <button
              onClick={() =>
                completeReminder(
                  lead._id
                )
              }
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"
            >

              Mark Complete

            </button>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Reminders;