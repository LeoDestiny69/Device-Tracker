import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload.exp * 1000 < Date.now()) {
      // token หมดอายุ
      localStorage.clear();
      return <Navigate to="/login" replace />;
    }
  } catch {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  return children;
}
