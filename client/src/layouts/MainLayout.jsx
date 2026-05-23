import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

const MainLayout = () => {

  const location = useLocation();

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Active Link Style
  const isActive = (path) =>
    location.pathname === path;

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-[260px] bg-[#0f172a] text-white flex flex-col justify-between">

        {/* Top */}
        <div>

          {/* Logo */}
          <div className="p-6 border-b border-gray-700">
            <h1 className="text-3xl font-bold">
              CRM System
            </h1>

            <p className="text-gray-400 text-sm mt-1">
              Manufacturing Dashboard
            </p>
          </div>

          {/* Navigation */}
          <nav className="p-5 space-y-3">

            <Link
              to="/"
              className={`block px-4 py-3 rounded-lg transition ${
                isActive("/")
                  ? "bg-blue-600"
                  : "hover:bg-gray-800"
              }`}
            >
              Dashboard
            </Link>

            <Link
              to="/leads"
              className={`block px-4 py-3 rounded-lg transition ${
                isActive("/leads")
                  ? "bg-blue-600"
                  : "hover:bg-gray-800"
              }`}
            >
              Leads
            </Link>

            <Link
              to="/create-lead"
              className={`block px-4 py-3 rounded-lg transition ${
                isActive("/create-lead")
                  ? "bg-blue-600"
                  : "hover:bg-gray-800"
              }`}
            >
              Create Lead
            </Link>

          </nav>

        </div>

        {/* Bottom */}
        <div className="p-5 border-t border-gray-700">

          <button
            onClick={logout}
            className="w-full bg-red-500 hover:bg-red-600 transition py-3 rounded-lg"
          >
            Logout
          </button>

        </div>

      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <div className="bg-white shadow px-8 py-5 flex justify-between items-center">

          <div>
            <h2 className="text-2xl font-bold">
              Manufacturing CRM
            </h2>

            <p className="text-gray-500 text-sm">
              Business Development Dashboard
            </p>
          </div>

          <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
            S
          </div>

        </div>

        {/* Page Content */}
        <div className="p-8">
          <Outlet />
        </div>

      </div>

    </div>
  );
};

export default MainLayout;