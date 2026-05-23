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
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
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
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;