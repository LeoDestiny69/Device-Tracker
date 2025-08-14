import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import api from "../services/api";
import DashboardUI from "../components/DashboardUI"; 

export default function Dashboard() {
  const [devices, setDevices] = useState([]);
  const [filters, setFilters] = useState({ type: "", code: "", name: "", purchase_date: "", created_date: ""});
  const navigate = useNavigate(); 

  const fetchData = async () => {
    try {
      const res = await api.get("/api/assets/", { params: filters });
      setDevices(res.data);
    } catch (err) {
      console.error("Error fetching assets:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters]);

  const handleDelete = async (id) => {
    if (window.confirm("ต้องการลบอุปกรณ์นี้หรือไม่?")) {
      try {
        await api.delete(`/api/assets/${id}/`);
        alert("ลบข้อมูลสำเร็จ");
        fetchData();
      } catch (err) {
        console.error("Delete error:", err);
        alert("เกิดข้อผิดพลาดในการลบข้อมูล");
      }
    }
  };

  const handleLogout = () => {
  localStorage.clear();
  navigate("/login", { replace: true });
};


  return (
    <DashboardUI
      devices={devices}
      filters={filters}
      setFilters={setFilters}
      onDelete={handleDelete}
      onLogout={handleLogout} 
    />
  );
}
