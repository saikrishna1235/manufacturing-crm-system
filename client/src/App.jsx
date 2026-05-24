import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import CreateLead from "./pages/CreateLead";
import Login from "./pages/Login";
import EditLead from "./pages/EditLead";
import ProtectedRoute from "./components/ProtectedRoute";
import Pipeline from "./pages/Pipeline";
import Register from "./pages/Register";
import Users from "./pages/Users";
import Analytics from "./pages/Analytics";
import Reminders from "./pages/Reminders";
import EmployeePerformance
from "./pages/EmployeePerformance";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
            path="/register"
            element={<Register />}
          />
        {/* Main Layout */}
        <Route
            path="/"
            element={
                <ProtectedRoute>
                <MainLayout />
                </ProtectedRoute>
            }
            >
          <Route index element={<Dashboard />} />

          <Route
            path="leads"
            element={<Leads />}
          />

          <Route
            path="create-lead"
            element={<CreateLead />}
          />
          <Route
            path="edit-lead/:id"
            element={<EditLead />}
            />
            <Route path="/pipeline" element={<Pipeline />} />
            <Route
              path="/users"
              element={<Users />}
            />
            <Route
              path="/analytics"
              element={<Analytics />}
            />
            <Route
            path="/reminders"
            element={<Reminders />}
          />
          <Route
            path="/performance"
            element={
              <EmployeePerformance />
            }
          />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;