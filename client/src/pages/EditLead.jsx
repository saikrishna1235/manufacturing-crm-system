import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";
const EditLead = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    industry: "",
    source: "",
    status: "",
    notes: "",
    expectedRevenue: "",
  });

  // Fetch Single Lead
  const fetchLead = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get(`/leads/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFormData(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLead();
  }, []);

  // Handle Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Update Lead
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.put(`/leads/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Lead updated successfully");

      navigate("/leads");

    } catch (error) {
      console.log(error);
      toast.error("Error updating lead");
    }
  };

  return (
    <div>

      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Edit Lead
        </h1>

        <p className="text-gray-500 mt-2">
          Update lead details
        </p>
      </div>

      <div className="bg-white p-8 rounded-xl shadow max-w-3xl">

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            name="name"
            placeholder="Lead Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            name="industry"
            placeholder="Industry"
            value={formData.industry}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            name="source"
            placeholder="Lead Source"
            value={formData.source}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          >
            <option>New</option>
            <option>Contacted</option>
            <option>Qualified</option>
            <option>Proposal Sent</option>
            <option>Negotiation</option>
            <option>Closed Won</option>
            <option>Closed Lost</option>
          </select>

          <input
            type="number"
            name="expectedRevenue"
            placeholder="Expected Revenue"
            value={formData.expectedRevenue}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <textarea
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full border p-3 rounded h-32"
          />

          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 rounded"
          >
            Update Lead
          </button>

        </form>

      </div>

    </div>
  );
};

export default EditLead;