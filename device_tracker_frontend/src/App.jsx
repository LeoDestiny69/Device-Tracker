import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DeviceForm from "./pages/DeviceForm";
import EditDevice from "./pages/EditDevice";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const isLoggedIn = !!localStorage.getItem("access_token");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login />}
        />

        {/* Protected Pages */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/devices/new"
          element={
            <ProtectedRoute>
              <DeviceForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/devices/:id/edit"
          element={
            <ProtectedRoute>
              <EditDevice />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
