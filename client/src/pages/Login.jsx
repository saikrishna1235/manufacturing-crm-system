import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";

import toast from "react-hot-toast";

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await API.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data)
      );

      toast.success("Login successful");

      navigate("/");

    } catch (error) {
      console.log(error);

      toast.error("Invalid credentials");
    }
  };

  return (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

    <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

      {/* LEFT SIDE */}
      <div className="p-10 flex flex-col justify-center">

        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Welcome Back
        </h1>

        <p className="text-gray-500 mb-8">
          Login to access your CRM dashboard
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-semibold"
          >
            Login
          </button>

        </form>

      </div>

      {/* RIGHT SIDE */}
      <div className="bg-gray-50 p-10 border-l flex flex-col justify-center">

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Demo Access
        </h2>

        {/* Admin */}
        <div className="bg-white border rounded-xl p-5 shadow-sm mb-5">

          <h3 className="font-semibold text-gray-800 mb-3">
            Admin Login
          </h3>

          <p className="text-sm text-gray-600">
            Email:
            <span className="font-medium ml-1">
              saikrishnakoyyada37@gmail.com
            </span>
          </p>

          <p className="text-sm text-gray-600 mt-1">
            Password:
            <span className="font-medium ml-1">
              123456
            </span>
          </p>

        </div>

        {/* Employee */}
        <div className="bg-white border rounded-xl p-5 shadow-sm mb-5">

          <h3 className="font-semibold text-gray-800 mb-3">
            Employee Login
          </h3>

          <p className="text-sm text-gray-600">
            Email:
            <span className="font-medium ml-1">
              admin@gmail.com
            </span>
          </p>

          <p className="text-sm text-gray-600 mt-1">
            Password:
            <span className="font-medium ml-1">
              123456
            </span>
          </p>

        </div>

        {/* Visitor/Register */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-800 mb-5">

          <p className="font-semibold mb-1">
            New Employee?
          </p>

          <p>
            Register here:
          </p>

          <a
            href="https://manufacturing-crm-system.vercel.app/register"
            target="_blank"
            rel="noreferrer"
            className="text-green-700 font-medium underline"
          >
            Open Registration Page
          </a>

        </div>

        {/* Warning */}
        <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-4 text-sm text-yellow-900 leading-relaxed">

          Backend server is hosted on Render free tier.
          Initial login may take up to 1 minute
          while the server wakes up.

        </div>

      </div>

    </div>

  </div>
);
};
export default Login;
