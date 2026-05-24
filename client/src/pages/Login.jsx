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
        <p className="text-sm text-gray-600 text-center mb-4">
        Demo admin Login → Email: saikrishnakoyyada37@gmail.com | Password: 123456
        </p>
        <p className="text-sm text-gray-600 text-center mb-4">
        Demo employee Login → Email: admin@gmail.com | Password: 123456
        </p>
        <p className="text-sm text-gray-600 text-center mb-4">
          visit this to register:https://manufacturing-crm-system.vercel.app/register 
        </p>
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
