import axios from "axios";

const api = axios.create({ baseURL: "/" });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  res => res,
  async (err) => {
    const originalRequest = err.config;

    // ถ้า 401 และยังไม่เคย retry
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refresh = localStorage.getItem("refresh_token");

      if (refresh) {
        try {
          const { data } = await axios.post("/api/token/refresh/", { refresh });
          localStorage.setItem("access_token", data.access);
          originalRequest.headers.Authorization = `Bearer ${data.access}`;
          return api(originalRequest); // retry request เดิม
        } catch {
          // refresh ล้มเหลว → ลบ token และ redirect
          localStorage.clear();
          window.location.href = "/login";
          return Promise.reject(err);
        }
      } else {
        // ไม่มี refresh token → redirect login
        localStorage.clear();
        window.location.href = "/login";
      }
    }

    return Promise.reject(err);
  }
);

export default api;