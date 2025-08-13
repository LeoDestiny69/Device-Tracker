import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import EditDeviceForm from "../components/EditDeviceUI";

export default function EditDevice() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    code: "",
    name: "",
    type: "",
    purchase_date: "",
    status: "",
  });
  const [errors, setErrors] = useState({});

  const formatDateForInput = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const pad = (n) => (n < 10 ? "0" + n : n);
    return (
      date.getFullYear() +
      "-" +
      pad(date.getMonth() + 1) +
      "-" +
      pad(date.getDate()) +
      "T" +
      pad(date.getHours()) +
      ":" +
      pad(date.getMinutes())
    );
  };

  useEffect(() => {
    const fetchDevice = async () => {
      try {
        const res = await api.get(`/api/assets/${id}/`);
        const purchase_date = res.data.purchase_date
          ? formatDateForInput(res.data.purchase_date)
          : "";
        setForm({ ...res.data, purchase_date });
      } catch (err) {
        console.error("Error loading device:", err);
      }
    };
    fetchDevice();
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      const payload = {
        ...form,
        purchase_date: form.purchase_date
          ? form.purchase_date.split("T")[0]
          : "",
      };
      await api.put(`/api/assets/${id}/`, payload);
      alert("อัปเดตข้อมูลสำเร็จ");
      navigate("/dashboard");
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
      setErrors(err.response?.data || {});
    }
  };

  const handleDelete = async () => {
    if (window.confirm("ต้องการลบอุปกรณ์นี้หรือไม่?")) {
      try {
        await api.delete(`/api/assets/${id}/`);
        alert("ลบข้อมูลสำเร็จ");
        navigate("/dashboard");
      } catch (err) {
        console.error("Delete error:", err);
        alert("เกิดข้อผิดพลาดในการลบข้อมูล");
      }
    }
  };

  return (
    <EditDeviceForm
      form={form}
      errors={errors}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onDelete={handleDelete}
      onCancel={() => navigate("/dashboard")}
    />
  );
}
