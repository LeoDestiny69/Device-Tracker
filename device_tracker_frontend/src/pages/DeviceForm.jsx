// src/pages/DeviceForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeviceFormUI from "../components/DeviceFormUI";
import api from "../services/api";

export default function DeviceForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    code: "",
    name: "",
    type: "",
    purchase_date: "",
    status: ""
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    // ตรวจสอบรหัสอุปกรณ์
    if (!form.code) {
      newErrors.code = "กรุณากรอกรหัสอุปกรณ์";
    } else if (!/^\d+$/.test(form.code)) {
      newErrors.code = "รหัสต้องเป็นตัวเลขเท่านั้น";
    }

    // ตรวจสอบชื่ออุปกรณ์
    if (!form.name.trim()) {
      newErrors.name = "กรุณากรอกชื่ออุปกรณ์";
    }

    // ตรวจสอบประเภท
    if (!form.type) {
      newErrors.type = "กรุณาเลือกประเภท";
    }

    // ตรวจสอบวันที่ซื้อ
    if (!form.purchase_date) {
      newErrors.purchase_date = "กรุณาเลือกวันที่ซื้อ";
    }

    // ตรวจสอบสถานะ
    if (!form.status) {
      newErrors.status = "กรุณาเลือกสถานะ";
    }

    // ถ้ามี error ให้หยุดและแสดง
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

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
