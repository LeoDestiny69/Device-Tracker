import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DeviceForm from "./pages/DeviceForm";
import ProtectedRoute from "./components/ProtectedRoute";
import EditDevice from "./pages/EditDevice";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ถ้าใครเข้า "/" ให้ redirect ไป /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />

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
