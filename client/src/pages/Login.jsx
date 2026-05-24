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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-[400px]">

        <h1 className="text-3xl font-bold mb-6 text-center">
          CRM Login
        </h1>
        {/* Demo Credentials */}
<div className="bg-gray-50 border rounded-lg p-4 mb-5 space-y-3">

  <div>
    <h2 className="text-sm font-semibold text-gray-700 mb-1">
      Demo Admin Login
    </h2>

    <p className="text-sm text-gray-600">
      Email: saikrishnakoyyada37@gmail.com
    </p>

    <p className="text-sm text-gray-600">
      Password: 123456
    </p>
  </div>

  <div className="border-t pt-3">
    <h2 className="text-sm font-semibold text-gray-700 mb-1">
      Demo Employee Login
    </h2>

    <p className="text-sm text-gray-600">
      Email: admin@gmail.com
    </p>

    <p className="text-sm text-gray-600">
      Password: 123456
    </p>
  </div>

  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 text-xs text-yellow-800 leading-relaxed">
    "Please wait up to one minute after clicking the link for the server to wake up, as the backend is hosted on Render's free tier. Thank you for your patience and cooperation."
  </div>

</div>
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
};

export default Login;
