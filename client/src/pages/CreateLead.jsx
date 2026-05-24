import { useEffect, useState } from "react";

import API from "../services/api";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

const CreateLead = () => {

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    industry: "",
    source: "",
    status: "New",
    notes: "",
    expectedRevenue: "",
    assignedTo: "",
    followUpDate: "",
    priority: "Medium",

  });

  // =========================
  // Fetch Users
  // =========================

  const fetchUsers = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await API.get(
        "/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // =========================
  // Handle Change
  // =========================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // Submit Form
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      await API.post(
        "/leads",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "Lead created successfully"
      );

      navigate("/leads");

    } catch (error) {

      console.log(error);

      toast.error(
        "Error creating lead"
      );
    }
  };

  return (

    <div>

      {/* Title */}

      <div className="mb-6">

        <h1 className="text-3xl font-bold">
          Create Lead
        </h1>

        <p className="text-gray-500 mt-2">
          Add a new business lead
        </p>

      </div>

      {/* Form */}

      <div className="bg-white p-8 rounded-xl shadow max-w-3xl">

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Name */}

          <input
            type="text"
            name="name"
            placeholder="Lead Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          {/* Company */}

          <input
            type="text"
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          {/* Email */}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          {/* Phone */}

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          {/* Industry */}

          <input
            type="text"
            name="industry"
            placeholder="Industry"
            value={formData.industry}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          {/* Source */}

          <input
            type="text"
            name="source"
            placeholder="Lead Source"
            value={formData.source}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />
          {/* Status */}
          <input
            type="datetime-local"
            name="followUpDate"
            value={formData.followUpDate}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />
          {/* Revenue */}

          <input
            type="number"
            name="expectedRevenue"
            placeholder="Expected Revenue"
            value={formData.expectedRevenue}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          {/* Assign Employee */}

          <select
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          >

            <option value="">
              Select Employee
            </option>

            {users.map((user) => (

              <option
                key={user._id}
                value={user._id}
              >
                {user.name}
              </option>

            ))}

          </select>
          <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            >

              <option value="High">
                High Priority
              </option>

              <option value="Medium">
                Medium Priority
              </option>

              <option value="Low">
                Low Priority
              </option>

            </select>
            <input
            type="date"
            name="followUpDate"
            value={formData.followUpDate}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />
          {/* Notes */}

          <textarea
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full border p-3 rounded h-32"
          />

          {/* Submit */}

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
          >

            Create Lead

          </button>

        </form>

      </div>

    </div>
  );
};

export default CreateLead;