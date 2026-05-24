import { useEffect, useState } from "react";

import API from "../services/api";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

const CreateLead = () => {

  const navigate = useNavigate();

  const [users, setUsers] =
    useState([]);

  const [formData, setFormData] =
    useState({
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

      const token =
        localStorage.getItem("token");

      const response =
        await API.get(
          "/users",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
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
      [e.target.name]:
        e.target.value,
    });
  };

  // =========================
  // Submit Form
  // =========================

  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    try {

      const token =
        localStorage.getItem("token");

      await API.post(
        "/leads",
        formData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
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

    <div className="max-w-4xl">

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          Create Lead
        </h1>

        <p className="text-gray-500 mt-2">
          Add a new business lead
        </p>

      </div>

      {/* Form */}

      <div className="bg-white p-8 rounded-2xl shadow-lg">

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
            className="
              w-full
              border
              p-4
              rounded-xl
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
            required
          />

          {/* Company */}

          <input
            type="text"
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleChange}
            className="
              w-full
              border
              p-4
              rounded-xl
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
            required
          />

          {/* Email */}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="
              w-full
              border
              p-4
              rounded-xl
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

          {/* Phone */}

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="
              w-full
              border
              p-4
              rounded-xl
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

          {/* Industry */}

          <input
            type="text"
            name="industry"
            placeholder="Industry"
            value={formData.industry}
            onChange={handleChange}
            className="
              w-full
              border
              p-4
              rounded-xl
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

          {/* Source */}

          <input
            type="text"
            name="source"
            placeholder="Lead Source"
            value={formData.source}
            onChange={handleChange}
            className="
              w-full
              border
              p-4
              rounded-xl
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

          {/* Follow Up Date */}

          <div>

            <label className="block mb-2 font-semibold">

              Follow Up Date

            </label>

            <input
              type="datetime-local"
              name="followUpDate"
              value={
                formData.followUpDate
              }
              onChange={handleChange}
              className="
                w-full
                border
                p-4
                rounded-xl
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />

          </div>

          {/* Revenue */}

          <input
            type="number"
            name="expectedRevenue"
            placeholder="Expected Revenue"
            value={
              formData.expectedRevenue
            }
            onChange={handleChange}
            className="
              w-full
              border
              p-4
              rounded-xl
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

          {/* Assign Employee */}

          <div>

            <label className="block mb-2 font-semibold">

              Assign Employee

            </label>

            <select
              name="assignedTo"
              value={
                formData.assignedTo
              }
              onChange={handleChange}
              className="
                w-full
                border
                p-4
                rounded-xl
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            >

              <option value="">
                Select Employee
              </option>

              {users
                .filter(
                  (user) =>
                    user.role ===
                    "employee"
                )
                .map((user) => (

                  <option
                    key={user._id}
                    value={user._id}
                  >

                    {user.name}

                  </option>

                ))}

            </select>

          </div>

          {/* Priority */}

          <div>

            <label className="block mb-2 font-semibold">

              Priority

            </label>

            <select
              name="priority"
              value={
                formData.priority
              }
              onChange={handleChange}
              className="
                w-full
                border
                p-4
                rounded-xl
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
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

          </div>

          {/* Notes */}

          <textarea
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={handleChange}
            className="
              w-full
              border
              p-4
              rounded-xl
              h-32
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

          {/* Submit */}

          <button
            type="submit"
            className="
              bg-blue-600
              hover:bg-blue-700
              transition
              text-white
              px-8
              py-4
              rounded-xl
              font-semibold
            "
          >

            Create Lead

          </button>

        </form>

      </div>

    </div>
  );
};

export default CreateLead;
