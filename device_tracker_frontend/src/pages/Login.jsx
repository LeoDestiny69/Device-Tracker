// Login.jsx
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginUI";
import api from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    try {
      const { data } = await api.post("/api/token/", credentials);
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  return <LoginForm onSubmit={handleLogin} />;
}
