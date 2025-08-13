// src/pages/DeviceForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeviceFormUI from "../components/DeviceFormUI";
import api from "../services/api";

export default function DeviceForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ code: "", name: "", type: "", purchase_date: "", status: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      await api.post("/api/assets/", form);
      navigate("/dashboard");
    } catch (err) {
      setErrors(err.response?.data || {});
    }
  };

  return (
    <DeviceFormUI
      form={form}
      errors={errors}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onCancel={() => navigate("/dashboard")}
    />
  );
}
