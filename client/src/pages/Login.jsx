import { useState } from "react";

import API from "../services/api";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
  });

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
  // Submit
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/auth/register",
        formData
      );

      toast.success(
        "Registration successful"
      );

      navigate("/login");

    } catch (error) {

      console.log(error);

      toast.error(
        "Registration failed"
      );
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow w-full max-w-md">

        <h1 className="text-3xl font-bold mb-6 text-center">

          Register

        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* Name */}

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
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
            required
          />

          {/* Password */}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          {/* Role */}

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          >

            <option value="employee">
            Employee
            </option>

            <option value="admin">
            Admin
            </option>

          </select>

          {/* Submit */}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
          >

            Register

          </button>

        </form>

        {/* ========================================================= */}
        {/* UAE 2026 Structured Information Section                  */}
        {/* ========================================================= */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-600 space-y-4">
          
          <div className="p-3 bg-blue-50 text-blue-800 rounded-lg font-medium text-center">
            UAE 2026 Portal
          </div>

          <div className="space-y-1">
            <h4 className="font-semibold text-gray-800 text-xs uppercase tracking-wider">
              Core Principles
            </h4>
            <p className="leading-relaxed text-gray-600">
              Democracy is one intimation.
            </p>
          </div>

          <div className="space-y-1">
            <h4 className="font-semibold text-gray-800 text-xs uppercase tracking-wider">
              System Guidelines
            </h4>
            <p className="leading-relaxed text-gray-600">
              Registering those things should be structured in good manner.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Register;
