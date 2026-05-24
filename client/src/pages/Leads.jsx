import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Leads = () => {

  const [leads, setLeads] = useState([]);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("");

  // Fetch Leads
  const fetchLeads = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response = await API.get(
        "/leads",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLeads(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Delete Lead
  const deleteLead = async (id) => {

    try {

      const token =
        localStorage.getItem("token");

      await API.delete(`/leads/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchLeads();

      toast.success(
        "Lead deleted successfully"
      );

    } catch (error) {

      console.log(error);

      toast.error("Error deleting lead");
    }
  };

  // Filter Leads
  const filteredLeads = leads.filter(
    (lead) => {

      const matchesSearch =

  (lead.name || "")
    .toLowerCase()
    .includes(search.toLowerCase())

  ||

  (lead.company || "")
    .toLowerCase()
    .includes(search.toLowerCase());

      const matchesStatus =

        statusFilter === ""

        ||

        lead.status === statusFilter;

      return (
        matchesSearch && matchesStatus
      );
    }
  );

  return (

    <div>

      {/* Title */}

      <div className="mb-6">

        <h1 className="text-3xl font-bold">
          Leads
        </h1>

        <p className="text-gray-500 mt-2">
          Manage all business leads
        </p>

      </div>

      {/* Search & Filter */}

      <div className="flex flex-col md:flex-row gap-4 mb-6">

        {/* Search */}

        <input
          type="text"
          placeholder="Search leads..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border p-3 rounded-lg w-full md:w-[300px]"
        />

        {/* Status Filter */}

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          className="border p-3 rounded-lg w-full md:w-[220px]"
        >

          <option value="">
            All Status
          </option>

          <option value="New">
            New
          </option>

          <option value="Contacted">
            Contacted
          </option>

          <option value="Qualified">
            Qualified
          </option>

          <option value="Proposal Sent">
            Proposal Sent
          </option>

          <option value="Negotiation">
            Negotiation
          </option>

          <option value="Closed Won">
            Closed Won
          </option>

          <option value="Closed Lost">
            Closed Lost
          </option>

        </select>

      </div>

      {/* Table */}

      <div className="bg-white rounded-2xl shadow overflow-x-auto">

        <table className="w-full text-sm">

          {/* Header */}

          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">

            <tr>

              <th className="text-left p-4">
                Name
              </th>

              <th className="text-left p-4">
                Company
              </th>

              <th className="text-left p-4">
                Industry
              </th>

              <th className="text-left p-4">
                Status
              </th>

              <th className="text-left p-4">
                Revenue
              </th>
              <th className="text-left p-4">
                Priority
              </th>
              <th className="text-left p-4">
                Actions
              </th>

            </tr>

          </thead>

          {/* Body */}

          <tbody>

            {filteredLeads.length > 0 ? (

              filteredLeads.map((lead) => (

                <tr
                  key={lead._id}
                  className="border-t hover:bg-gray-50 transition"
                >

                  {/* Name */}

                  <td className="p-4 font-medium">
                    {lead.name}
                  </td>

                  {/* Company */}

                  <td className="p-4">
                    {lead.company}
                  </td>

                  {/* Industry */}

                  <td className="p-4">
                    {lead.industry}
                  </td>

                  {/* Status */}

                  <td className="p-4">

                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">

                      {lead.status}

                    </span>

                  </td>
                  <td className="p-4">

                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      lead.priority === "High"
                        ? "bg-red-100 text-red-600"
                        : lead.priority === "Medium"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-green-100 text-green-600"
                    }`}>

                      {lead.priority}

                    </span>

                  </td>
                  {/* Revenue */}

                  <td className="p-4">
                    ₹{lead.expectedRevenue}
                  </td>

                  {/* Actions */}

                  <td className="p-4">

                    <div className="flex gap-2">

                      <Link
                        to={`/edit-lead/${lead._id}`}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() =>
                          deleteLead(lead._id)
                        }
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="6"
                  className="text-center p-8 text-gray-500"
                >

                  No leads found

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Leads;