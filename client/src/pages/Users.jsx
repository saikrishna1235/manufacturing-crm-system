import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

const Users = () => {

  const [users, setUsers] =
    useState([]);

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

  return (

    <div>

      {/* Title */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold">

          Team Management

        </h1>

        <p className="text-gray-500 mt-2">

          Manage employees and admins

        </p>

      </div>

      {/* Users Grid */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {users.map((user) => (

          <div
            key={user._id}
            className="bg-white p-6 rounded-2xl shadow"
          >

            {/* Avatar */}

            <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mb-4 uppercase">

              {user.name?.charAt(0)}

            </div>

            {/* Name */}

            <h2 className="text-xl font-bold">

              {user.name}

            </h2>

            {/* Email */}

            <p className="text-gray-500 mt-1">

              {user.email}

            </p>

            {/* Role */}

            <span className={`inline-block mt-4 px-4 py-2 rounded-full text-sm font-semibold ${
              user.role === "admin"
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}>

              {user.role}

            </span>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Users;